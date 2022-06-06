exports.plugin = {
  name: 'routesProyectos',
  version: '1.0.0',
  register: async (server, options) => {
    const colPry = 'proyectos';
    const colCot = 'cotizaciones';
    const { transform } = require('../services/transform');
    const { getResources, getResource, saveMany, updateResource, addFoto } = server.methods;

    const line = [
      {
        $lookup: {
          from: 'cotizaciones',
          localField: 'cotizacionId',
          foreignField: 'cotizacionId',
          as: 'proyectos_ready',
        },
      },
      { $unwind: '$proyectos_ready' },
      { $sort: { proyectoId: 1 } },
    ];
    server.route([
      {
        method: 'GET',
        path: '/proyectos',
        handler: async (request, h) => {
          const proyectos = await getResources(colPry, line);
          return transform(proyectos);
        },
        options: {
          description: 'Lista de todos los proyectos',
        },
      },
      {
        method: 'GET',
        path: '/proyectos/{cotizacionId}/{proyectoId?}',
        handler: async (request, h) => {
          const criteria = request.params.proyectoId
            ? {
                cotizacionId: parseInt(request.params.cotizacionId, 10),
                proyectoId: parseInt(request.params.proyectoId, 10),
              }
            : { cotizacionId: parseInt(request.params.cotizacionId, 10) };

          const pipeline = [{ $match: criteria }, ...line];
          const proyectos = await getResources(colPry, pipeline);
          return transform(proyectos);
        },
        options: {
          description: 'Lista de proyectos en Cotizacion o Proyecto',
        },
      },
      {
        method: 'POST',
        path: '/proyectos/{cotizacionId}',
        options: {
          description: 'create proyects with basic payload',
        },
        handler: async (request, h) => {
          const proyectos = [];
          const cotizacionId = parseInt(request.params.cotizacionId, 10);
          // console.log('POST BASIC PROYECTOS{cotizacion}', cotizacionId);
          const cotizacion = await getResource(colCot, {
            cotizacionId: parseInt(cotizacionId, 10),
          });
          for (let index = 1; index <= parseInt(cotizacion.sitios, 10); index++) {
            proyectos.push({
              cotizacionId,
              proyectoId: index,
              createdDate: new Date(),
              empezar: [],
              terminar: [],
              reporte: [],
            });
          }
          try {
            const saveProyectos = await saveMany(colPry, proyectos);
            return {
              message: `proyectos agregados ${saveProyectos.insertedCount}`,
            };
          } catch (error) {
            return error.writeErrors;
          }
        },
      },
      {
        method: 'POST',
        path: '/proyecto/{cotizacionId}/{proyectoId}',
        options: {
          description: 'Modifica proyecto enter Cot/Pry',
        },
        handler: async (request, h) => {
          const cotizacionId = parseInt(request.params.cotizacionId, 10);
          const proyectoId = parseInt(request.params.proyectoId, 10);
          const { payload } = request;
          payload.inicio = new Date(payload.inicio);
          payload.terminado = new Date(payload.terminado);

          const proyecto = await updateResource(colPry, { cotizacionId, proyectoId }, payload);
          return proyecto.modifiedCount > 0
            ? h
                .response({
                  cotizacion: cotizacionId,
                  proyecto: proyectoId,
                  message: 'modificado',
                })
                .code(202)
            : h.notValid();
        },
      },
      {
        method: 'GET',
        path: '/findproyectos',
        options: {
          description: 'search in proyectos using sitio',
        },
        handler: async (request, h) => {
          const x = request.query.val;
          const pipeline = [
            {
              $search: {
                index: 'sitio_direccion',
                text: {
                  query: x,
                  path: ['sitio', 'direccion'],
                  fuzzy: {
                    maxEdits: 2,
                    prefixLength: 3,
                    maxExpansions: 100,
                  },
                  // path: {
                  // 	wildcard: '*',
                  // },
                },
              },
            },
            ...line,
          ];
          try {
            const proyectos = await getResources(colPry, pipeline);
            // console.log(proyectos);
            return transform(proyectos);
          } catch (error) {
            // console.log(error);
            return error;
          }
        },
      },
      {
        method: 'POST',
        path: '/addfoto',
        options: {
          validate: {
            payload: require('./schemas').fotoSchema,
          },
          description: 'Agregar Foto a Proyecto',
        },
        handler: async (request, h) => {
          // console.log('PAYLOAD', request.payload);
          const { cotizacionId, proyectoId, tipo, laFoto, reporte } = request.payload;
          if (reporte !== undefined) {
            reporte.push({ dateReporte: new Date() });
            // console.log('REPORTE', reporte);
          }
          const query = {
            cotizacionId: parseInt(cotizacionId, 10),
            proyectoId: parseInt(proyectoId, 10),
          };
          const data = tipo ? { [tipo]: laFoto } : { reporte };

          const savedFoto = await addFoto('proyectos', query, data);

          return savedFoto.modifiedCount > 0 ? h.response({ message: 'file agregado' }) : h.notValid();
        },
      },
    ]);
  },
};
