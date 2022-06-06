const Joi = require('joi');

// module.exports.baseSchema = Joi.object({
//   cotizacionId: Joi.alternatives(
//     Joi.number(),
//     Joi.string()
//       .required()
//       .pattern(/^[0-9]+$/),
//   ),
//   proyectoId: Joi.alternatives(
//     Joi.number(),
//     Joi.string()
//       .required()
//       .pattern(/^[0-9]+$/),
//   ),
// })
module.exports.fotoSchema = Joi.object({
  cotizacionId: Joi.alternatives(
    Joi.number(),
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
  ),
  proyectoId: Joi.alternatives(
    Joi.number(),
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
  ),
  tipo: Joi.string().required().valid('empezar', 'terminar'),
  laFoto: Joi.string().required(),
});

module.exports.reporteSchema = Joi.object({
  cotizacionId: Joi.alternatives(
    Joi.number(),
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
  ),
  proyectoId: Joi.alternatives(
    Joi.number(),
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
  ),
  reporte: Joi.object({
    grupo1: Joi.object({
      inicio: Joi.string(),
      final: Joi.string(),
    }),
    grupo2: Joi.object({
      inicio: Joi.string(),
      final: Joi.string(),
    }),
  }),
});
module.exports.verReporte = Joi.object({
  cotizacionId: Joi.alternatives(
    Joi.number(),
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
  ),
  proyectoId: Joi.alternatives(
    Joi.number(),
    Joi.string()
      .required()
      .pattern(/^[0-9]+$/)
  ),
});
