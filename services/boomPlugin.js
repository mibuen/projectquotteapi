exports.plugin = {
	name: 'BOOM',
	version: '1.0.0',
	register: (server, options) => {
		const Boom = require('@hapi/boom');
		const notFound = () => Boom.notFound('RESOURCE_NOT_FOUND');
		const duplicated = () => Boom.badRequest('E11000 REGISTRO_DUPLICADO');
		const notValid = () => Boom.notAcceptable('COTIZACION_SIN_PROYECTOS');
		const notImage = () => Boom.unsupportedMediaType('WRONG_FILE_TYPE');
		const badData = () => Boom.badData('WRONG_OR_EMPTY_REQUEST');
		const notSaved = () => Boom.badData('DB_RESOURCE_NOT_UPDATED');

		server.decorate('toolkit', 'notFound', notFound);
		server.decorate('toolkit', 'duplicated', duplicated);
		server.decorate('toolkit', 'notValid', notValid);
		server.decorate('toolkit', 'notImage', notImage);
		server.decorate('toolkit', 'badData', badData);
		server.decorate('toolkit', 'notSaved', notSaved);
	},
};
