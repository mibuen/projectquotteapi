exports.plugin = {
  name: 'BOOM',
  version: '1.0.0',
  register: (server, options) => {
    const Boom = require('@hapi/boom')
    const notFound = (options = 'RESOURCE_NOT_FOUND') => Boom.notFound(options)
    const duplicated = (options = '') =>
      Boom.badRequest(`E11000 REGISTRO_DUPLICADO ${options}`)
    const notValid = (options = 'COTIZACION_SIN_PROYECTOS') =>
      Boom.notAcceptable(options)
    const notImage = (options = 'WRONG_FILE_TYPE') =>
      Boom.unsupportedMediaType(options)
    const badData = (options = 'WRONG_OR_EMPTY_REQUEST') =>
      Boom.badData(options)
    const notSaved = (options = 'DB_RESOURCE_NOT_UPDATED') =>
      Boom.badData(options)

    server.decorate('toolkit', 'notFound', notFound)
    server.decorate('toolkit', 'duplicated', duplicated)
    server.decorate('toolkit', 'notValid', notValid)
    server.decorate('toolkit', 'notImage', notImage)
    server.decorate('toolkit', 'badData', badData)
    server.decorate('toolkit', 'notSaved', notSaved)
  },
}
