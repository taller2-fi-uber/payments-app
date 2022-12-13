const walletService = require("./wallets");
const contractInteraction = require("./contractInteraction");
const transfer = require("./transfer");

module.exports = ({ config }) => ({
  walletService: walletService({ config }),
  contractInteraction: contractInteraction({ config }),
  transferService: transfer({ config })
});
