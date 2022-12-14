const config = require("./config");
const services = require("./services/services")({ config });
const routes = require("./routes");
const mongoose = require('mongoose');

// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

// Declares routes
routes.forEach(route => fastify.route(route({ config, services })));

// Run the server!
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    () => {
      const start = async () => {
        try {
          await fastify.listen(config.PORT, config.HOST);
          fastify.log.info(`server listening on ${fastify.server.address().port}`);
        } catch (err) {
          fastify.log.error(err);
          process.exit(1);
        }
      };
      start();
    },
  )
  .catch((error) => {
    logger.error(`server failed to start: ${error}`);
  });


