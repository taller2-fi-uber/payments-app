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
    required: ["user"],
  };
}

function handler({ walletService }) {
  return async function (req, reply) {
    const body = await walletService.createWallet(req.headers.user);
    return reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
