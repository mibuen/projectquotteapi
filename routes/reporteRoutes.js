exports.plugin = {
  name: 'reporteRoute',
  version: '1.0.0',
  register: async (server, options) => {
    const COL_PRY = 'proyectos'

    const { getResources, saveResource, updateResource, getResource, addFoto } =
      server.methods
    server.route([
      {
        method: 'POST',
        path: '/crear_reporte',
        options: {
          description: 'agrega fotos to reporte en mongo',
          validate: {
            payload: require('./schemas').reporteSchema,
          },
        },
        handler: async (request, h) => {
          const payload = request.payload
          const reporte = payload.reporte
          console.log('API', reporte)
          const criteria = {
            cotizacionId: parseInt(request.payload.cotizacionId, 10),
            proyectoId: parseInt(request.payload.proyectoId, 10),
          }
          const pipeline = [{ $match: criteria }]
          const mongoProyecto = await getResources(COL_PRY, pipeline)
          console.log('number', mongoProyecto)
          const obj = {
            numero: mongoProyecto[0].reporte.length + 1,
            createdDate: new Date(),
          }
          reporte.header = obj
          console.log(reporte)
          const saveReporte = await addFoto(COL_PRY, criteria, { reporte })
          return saveReporte.modifiedCount === 1
            ? h.response({ message: 'reporte creado' })
            : h.notCreated()
        },
      },
      {
        method: 'GET',
        path: '/ver_reporte/{cotizacionId}/{proyectoId}',
        options: {
          description: 'Ver Reportes Fotograficos',
          validate: {
            params: require('./schemas').verReporte,
          },
        },
        handler: async (request, h) => {
          const query = {
            cotizacionId: parseInt(request.params.cotizacionId, 10),
            proyectoId: parseInt(request.params.proyectoId, 10),
          }
          console.log('QUERY', query)
          const pipeline = [
            { $match: query },
            { $project: { _id: 0, reporte: 1 } },
          ]
          const reportes = await getResources(COL_PRY, pipeline)
          return reportes[0].reporte.length > 0
            ? h.response(reportes)
            : h.notFound('NO_EXISTEN_REPORTES')
        },
      },
    ])
  },
}
