const ethers = require("ethers");

const transferToAddress = ({ config }) => async (senderId, destinationAddress, amountToSendInEthers) => {
    const provider = new ethers.providers.InfuraProvider(config.network, config.infuraApiKey);
    const wallet = ethers.Wallet.fromMnemonic(config.deployerMnemonic).connect(provider);
    const walletSigner = wallet.connect(provider)

    const gas_limit = "0x100000"
    const currentGasPrice = await provider.getGasPrice()
    const gas_price = ethers.utils.hexlify(parseInt(currentGasPrice))

    const tx = {
        //from: "0x68AE4966E5AB5EC187c791bf062F664D65C23673".toLowerCase(),
        to: destinationAddress,
        value: ethers.utils.parseEther(amountToSendInEthers),
        //nonce: provider.getTransactionCount("0x68AE4966E5AB5EC187c791bf062F664D65C23673", "latest"),
        //gasLimit: ethers.utils.hexlify(gas_limit), // 100000
        //gasPrice: gas_price,
    }

    const transaction = await walletSigner.sendTransaction(tx)
    console.log(transaction)
    return { status: "OK", transaction};
};

module.exports = dependencies => ({
    transferToAddress: transferToAddress(dependencies),
});
