const ethers = require("ethers");
const Wallet = require("../models/walletModel");
const Deposit = require('../models/depositModel');
const Transaction = require("../models/transactionModel");

const getContract = (config, wallet) => {
  return new ethers.Contract(config.contractAddress, config.contractAbi, wallet);
};


const deposits = {};

const deposit = ({ config }) => async (senderId, senderWallet, amountToSend) => {
  const basicPayments =  getContract(config, senderWallet);

  const value = ethers.utils
    .parseEther(amountToSend)
     .toHexString();

  const tx = await basicPayments.deposit({value});


  tx.wait(1).then(
    async receipt => {
      //console.log("Transaction mined");
      const firstEvent = receipt && receipt.events && receipt.events[0];
      //console.log(firstEvent);
      if (firstEvent && firstEvent.event === "DepositMade") {
        deposits[tx.hash] = {
          senderAddress: firstEvent.args.sender,
          amountSent: firstEvent.args.amount,
        };

        Deposit.create({
          senderId: senderId,
          from: tx.from,
          to: tx.to,
          amountInEthers: amountToSend,
          chainId: tx.chainId,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .then(() => {
          console.log("desposito almacenado");
        })
        .catch((error) => {
          console.log("no se pudo almacenar el deposito");
        });
      } else {
        console.error(`Payment not created in tx ${tx.hash}`);
      }
    },
    error => {
      const reasonsList = error.results && Object.values(error.results).map(o => o.reason);
      const message = error instanceof Object && "message" in error ? error.message : JSON.stringify(error);
      console.error("reasons List");
      console.error(reasonsList);

      console.error("message");
      console.error(message);
    },
  );

  return tx;
};

const getDepositReceipt = ({}) => async depositTxHash => {
  return Transaction.findById(depositTxHash);
};

const getWalletBalance = ({ config }) => async walletId => {
  const provider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
  const wallet = await Wallet.findById(walletId);
  const balance = await provider.getBalance(wallet.address);
  return {
    balance: (ethers.utils.formatEther(balance)*1000000), // convert to gwei
    address: wallet.address,
    id: wallet.id
  };
};

const getDepositsData = ({config}) => async () => {
  return Deposit.find({});
}

const getLastDepositData = ({config}) => async () => {
  return Deposit.findOne({ order: [['createdAt', 'DESC']] });
}

module.exports = dependencies => ({
  deposit: deposit(dependencies),
  getDepositReceipt: getDepositReceipt(dependencies),
  getWalletBalance: getWalletBalance(dependencies),
  getDepositsData: getDepositsData(dependencies),
  getLastDepositData: getLastDepositData(dependencies),
});
