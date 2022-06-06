exports.plugin = {
  name: 'allRoutes',
  version: '1.0.0',
  register: async (server, options) => {
    await server.register([
      { plugin: require('./routesCotizaciones') },
      { plugin: require('./routesProyectos') },
      { plugin: require('./fotoRoutes') },
      { plugin: require('./reporteRoutes') },
    ]);
  },
};
