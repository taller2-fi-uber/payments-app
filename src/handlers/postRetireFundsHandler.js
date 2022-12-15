const Wallet = require("../models/walletModel");

function schema() {
  return {
    headers: {
      type: "object",
      properties: {
        user: {
          type: "string",
        },
      },
    },
    body: {
      type: "object",
      properties: {
        amountInGwei: {
          type: "number",
        },
        wallet: {
          type: "string",
        },
      },
    },
    required: ["amountInGwei", "client", "user"],
  };
  }

  function handler({ transferService, contractInteraction, walletService }) {
    return async function (req, reply) {

        let senderId = req.headers.user;
        const wallet = await walletService.getWallet(senderId);
        const amountInEthers = req.body.amountInGwei / 1000000
        const stringAmount = amountInEthers.toFixed(8)
        await contractInteraction.deposit(senderId, wallet, stringAmount);

        const body = await transferService.transferToAddress(senderId, req.body.wallet, stringAmount ); // gwei to eth
        return reply.code(200).send(body);
    };
  }

  module.exports = { handler, schema };
