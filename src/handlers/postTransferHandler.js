function schema() {
    return {
      params: {
        type: "object",
        properties: {
          id: {
            type: "integer",
          },
        },
      },
      required: ["id"],
    };
  }
  
  function handler({ transferService }) {
    return async function (req, reply) {
        const destinationAddress = req.body.destinationAddress;
        const amountInEthers = req.body.amountInEthers;
        const id = req.params.id;
        console.log(id)
        const body = await transferService.transferToAddress(id, destinationAddress, amountInEthers);   
        return reply.code(200).send(body);
    };
  }
  
  module.exports = { handler, schema };
  