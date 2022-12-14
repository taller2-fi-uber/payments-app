const getWalletData = require("./handlers/getWalletHandler");
const getWalletsData = require("./handlers/getWalletsHandler");
const createWallet = require("./handlers/createWalletHandler");
const createDeposit = require("./handlers/createDepositHandler");
const getDeposit = require("./handlers/getDepositHandler");
const getHelloWorld = require("./handlers/getHelloWorldhandler");
const getWalletBalance = require("./handlers/getWalletBalanceHandler");
const getDepositsData = require("./handlers/getDepositsDataHandler");
const getLastDepositData = require("./handlers/getLastDepositDataHandler");
const postTransfer =require("./handlers/postTransferHandler")
const postRetireFunds = require('./handlers/postRetireFundsHandler');

function getHelloWorldRoute({ services, config }) {
  return {
    method: "GET",
    url: "/",
    schema: getHelloWorld.schema(config),
    handler: getHelloWorld.handler({ config, ...services }),
  };
}

function getWalletDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet/:id",
    schema: getWalletData.schema(config),
    handler: getWalletData.handler({ config, ...services }),
  };
}

function getWalletsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/wallet",
    schema: getWalletsData.schema(config),
    handler: getWalletsData.handler({ config, ...services }),
  };
}

function createWalletRoute({ services, config }) {
  return {
    method: "POST",
    url: "/wallet",
    schema: createWallet.schema(config),
    handler: createWallet.handler({ config, ...services }),
  };
}

function createDepositRoute({ services, config }) {
  return {
    method: "POST",
    url: "/deposit",
    schema: createDeposit.schema(config),
    handler: createDeposit.handler({ config, ...services }),
  };
}

function getDepositRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit/:txHash",
    schema: getDeposit.schema(config),
    handler: getDeposit.handler({ config, ...services }),
  };
}

function getDepositsDataRoute({ services, config }) {
  return {
    method: "GET",
    url: "/deposit",
    schema: getDepositsData.schema(config),
    handler: getDepositsData.handler({ config, ...services }),
  };
}

function getLastDepositDataRoute({ services, config}) {
  return {
    method: "GET",
    url: "/deposit/last",
    schema: getLastDepositData.schema(config),
    handler: getLastDepositData.handler({config, ...services}),
  }
}

function getWalletBalanceRoute({ services, config }) {
  return {
    method: "GET",
    url: "/balance",
    schema: getWalletBalance.schema(config),
    handler: getWalletBalance.handler({ config, ...services }),
  };
}

function postTransferRoute({ services, config }) {
  return {
    method: "POST",
    url: "/transfer",
    schema: postTransfer.schema(config),
    handler: postTransfer.handler({ config, ...services }),
  };
}

function retireFunds({ services, config }) {
  return {
    method: "POST",
    url: "/retire",
    schema: postRetireFunds.schema(config),
    handler: postRetireFunds.handler({ config, ...services }),
  };
}

module.exports = [
  getHelloWorldRoute,
  getWalletDataRoute,
  getWalletsDataRoute,
  createWalletRoute,
  createDepositRoute,
  getDepositRoute,
  getWalletBalanceRoute,
  getDepositsDataRoute,
  getLastDepositDataRoute,
  postTransferRoute,
  retireFunds
];
