const ethers = require("ethers");
const Wallet = require("../models/walletModel")

const getDeployerWallet = ({ config }) => async () => {
  const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
  const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
  console.log("Deployer wallet" + wallet.address);
  return wallet;
};

const createWallet = () => async (user) => {
  const provider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
  // This may break in some environments, keep an eye on it
  const wallet = ethers.Wallet.createRandom().connect(provider);
  const new_wallet = await Wallet.create({
    _id: user,
    address: wallet.address, // d-pons: agregado persistencia de datos
    privateKey: wallet.privateKey
  });
  return {
    id: new_wallet.id
  };
};

const getWalletsData = () => async () => {
   // d-pons: busqueda en la bd
  return Wallet.find({}).select('_id address');
};

const getWalletData = () => async id => {
   // d-pons: busqueda en la bd
  return Wallet.findById(id).select('_id address');
};


const getWallet = ({}) => async (index) => {
  const provider = new ethers.providers.InfuraProvider("goerli", process.env.INFURA_API_KEY);
  const account = await Wallet.findById(index)

  return new ethers.Wallet(account.privateKey, provider);

};

module.exports = ({ config }) => ({
  createWallet: createWallet({ config }),
  getDeployerWallet: getDeployerWallet({ config }),
  getWalletsData: getWalletsData({ config }),
  getWalletData: getWalletData({ config }),
  getWallet: getWallet({ config }),
});
