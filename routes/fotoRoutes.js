exports.plugin = {
  name: 'fotoRoutes',
  version: '1.0.0',
  register: async (server, options) => {
    const { getResource } = server.methods
    const { uploadS3V4 } = require('../services/uploadS3V4')
    const { v4 } = require('uuid')

    const colPry = 'proyectos'
    const extensions = ['jpeg', 'jpg', 'png', 'webp']
    server.route([
      {
        method: 'POST',
        path: '/signed',
        options: {
          description: 'Get Signed Post from AWS',
        },
        handler: async (request, h) => {
          const { cotizacionId, proyectoId } = request.payload
          //console.log(request.payload)
          const [base, ext] = request.payload.fileName.split('.')
          if (!extensions.includes(ext.toLowerCase())) return h.notImage()

          const proyecto = await getResource(colPry, {
            cotizacionId: parseInt(cotizacionId, 10),
            proyectoId: parseInt(proyectoId, 10),
          })
          const { url, fields } = await uploadS3V4(
            `${cotizacionId}-${proyectoId}/${v4()}.${ext}`,
          )
          return proyecto ? h.response({ url, fields }) : h.notFound()
        },
      },
    ])
  },
}
