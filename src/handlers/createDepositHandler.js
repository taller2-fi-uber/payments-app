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
    params: {
      type: "object",
      properties: {
        amountInGwei: {
          type: "integer",
        },
      },
    },
    required: ["amountInGwei", "user"],
  };
}

function handler({ contractInteraction, walletService }) {
  return async function (req) {
    let senderId = req.headers.user;
    const wallet = await walletService.getWallet(senderId);
    const amountInEthers = req.body.amountInGwei / 1000000000
    const stringAmount = amountInEthers.toFixed(8)
    return contractInteraction.deposit(senderId, wallet, stringAmount);
  };
}

module.exports = { schema, handler };
