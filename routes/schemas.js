const { required } = require('joi');
const Joi = require('joi');

module.exports.fotoSchema = Joi.object({
	cotizacionId: Joi.number().required(),
	proyectoId: Joi.number().required(),
	tipo: Joi.string().valid('empezar', 'terminar'),
	laFoto: Joi.string(),
	reporte: Joi.array(),
})
	.with('tipo', 'laFoto')
	.without('tipo', 'reporte')
	.without('laFoto', 'reporte');
