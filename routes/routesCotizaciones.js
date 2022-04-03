//const { badData } = require('@hapi/boom');

exports.plugin = {
  name: 'routesCotizacion',
  version: '1.0.0',
  register: async (server, options) => {
    const colName = 'cotizaciones'
    const { getResources, saveResource, updateResource } = server.methods
    server.route([
      {
        method: 'GET',
        path: '/cotizaciones/{cliente?}',
        options: {
          description: 'GET Lista Cotizaciones',
        },
        handler: async (request, h) => {
          const criteria = request.params || {}
          //console.log(criteria);

          return getResources(colName, [{ $match: criteria }])
        },
      },
      {
        method: 'GET',
        path: '/cotizacion/{cotizacionId}',

        handler: async (request, h) => {
          const cotizacionId = parseInt(request.params.cotizacionId, 10)
          const cotizacion = await getResources(colName, [
            { $match: { cotizacionId } },
          ])
          //console.log(cotizacion);
          return cotizacion.length > 0 ? cotizacion : h.notFound()
        },
        options: {
          description: 'get cotizacion por cotizacionId',
        },
      },
      {
        method: 'POST',
        path: '/cotizaciones',
        options: {
          description: 'POST cotizacion nueva',
        },
        handler: async (request, h) => {
          //console.log(request.payload)
          try {
            const allCot = (await getResources(colName)).length + 1
            const { payload } = request
            payload.cotizacionId = allCot
            payload.resuelta = new Date(payload.resuelta)
            payload.emision = new Date(payload.emision)
            payload.captura = new Date()
            const newCotizacion = await saveResource(colName, payload)
            newCotizacion.cotizacionId = allCot
            return {
              message: `cotizacion ${newCotizacion.cotizacionId}`,
              cotizacionId: payload.cotizacionId,
            }
          } catch (error) {
            return h.duplicated()
          }
        },
      },
      {
        method: 'POST',
        path: '/cotizacion/{cotizacionId}',
        options: {
          description: 'Modifica  cotizacion',
        },
        handler: async (request, h) => {
          const { params, payload } = request
          //console.log('SAVE PAY', request.payload);
          if (payload === null) return h.badData()
          //console.log('PARAMS', params);
          const cotizacionId = parseInt(params.cotizacionId, 10)
          const { acknowledged, modifiedCount } = await updateResource(
            colName,
            { cotizacionId },
            payload,
          )
          return modifiedCount > 0
            ? h.response({
                message: `se actualizo cotizacion:${params.cotizacionId}`,
                cotizacionId: cotizacionId,
              })
            : h.notFound()
        },
      },
    ])
  },
}
