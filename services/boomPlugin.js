exports.plugin = {
  name: 'BOOM',
  version: '1.0.0',
  register: (server, options) => {
    const Boom = require('@hapi/boom');
    const notFound = () => Boom.notFound(options);
    const duplicated = () => Boom.badRequest(`E11000 REGISTRO_DUPLICADO ${options}`);
    const notValid = () => Boom.notAcceptable(options);
    const notImage = () => Boom.unsupportedMediaType(options);
    const badData = () => Boom.badData(options);
    const notSaved = () => Boom.badData(options);
    const badCredentials = () => Boom.unauthorized(options);

    server.decorate('toolkit', 'notFound', notFound);
    server.decorate('toolkit', 'duplicated', duplicated);
    server.decorate('toolkit', 'notValid', notValid);
    server.decorate('toolkit', 'notImage', notImage);
    server.decorate('toolkit', 'badData', badData);
    server.decorate('toolkit', 'notSaved', notSaved);
    server.decorate('toolkit', 'badCredentials', badCredentials);
  },
};
