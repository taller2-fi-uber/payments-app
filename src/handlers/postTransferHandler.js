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
          type: "string",
        },
        destinationAddress: {
          type: "string",
        },
      },
    },
    required: ["amountInGwei", "destinationAddress", "user"],
  };
  }

  function handler({ transferService }) {
    return async function (req, reply) {
        const destinationAddress = req.body.destinationAddress;
        const amountInGwei = req.body.amountInEthers;
        const id = req.headers.user;
        console.log(id)
        const body = await transferService.transferToAddress(id, destinationAddress, amountInGwei / 1000000000 ); // gwei to eth
        return reply.code(200).send(body);
    };
  }

  module.exports = { handler, schema };
