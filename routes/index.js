exports.plugin = {
	name: 'allRoutes',
	version: '1.0.0',
	register: async (server, options) => {
		//const Joi = require('joi');
		await server.register([
			{ plugin: require('./routesCotizaciones') },
			{ plugin: require('./routesProyectos') },
			{ plugin: require('./fotoRoutes') },
		]);
	},
};
