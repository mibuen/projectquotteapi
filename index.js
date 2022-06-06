const Hapi = require('@hapi/hapi');
require('dotenv').config();

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: true,
      validate: {
        failAction: (request, h, err) => err,
      },
    },
    router: {
      stripTrailingSlash: true,
    },
  });
  await server.register(require('./plugins'));
  server.auth.default('auth0');
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log('ERROR', err);
  process.exit(1);
});

init();
