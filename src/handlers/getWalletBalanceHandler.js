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
    required: ["id"],
  };
}

function handler({ contractInteraction }) {
  return async function (req, reply) {
    const body = await contractInteraction.getWalletBalance(req.headers.user);
    reply.code(200).send(body);
  };
}

module.exports = { handler, schema };
