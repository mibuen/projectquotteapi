exports.plugin = {
  name: 'Auth',
  version: '1.0.0',
  register: async (server, options) => {
    await server.register(require('@hapi/jwt'));
    server.auth.strategy('auth0', 'jwt', {
      keys: { uri: process.env.AUTH0_URI, algorithms: ['RS256'] },
      verify: {
        aud: [process.env.AUTH0_AUD],
        iss: process.env.AUTH0_ISS,
        sub: false,
        // nbf: true,
        // exp: true,
        // maxAgeSec: 14400, // 4 hours
        // timeSkewSec: 15
      },
      validate: (artifacts, request, h) =>
        // console.log(artifacts)
        ({
          isValid: true,
          // credentials: { user: artifacts.decoded.payload.user }
        }),
    });
  },
};
