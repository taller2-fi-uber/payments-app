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
        client: {
          type: "string",
        },
      },
    },
    required: ["amountInGwei", "client", "user"],
  };
  }

  function handler({ transferService }) {
    return async function (req, reply) {
        const driver = req.headers.user;
        const amountInEthers = req.body.amountInGwei / 1000000
        const stringAmount = amountInEthers.toFixed(8)
        const client = req.body.client;
        console.log({ client, driver })
        const body = await transferService.transferToAddress(client, driver, stringAmount ); // gwei to eth
        return reply.code(200).send(body);
    };
  }

  module.exports = { handler, schema };
