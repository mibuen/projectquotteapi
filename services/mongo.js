exports.plugin = {
	name: 'mongo',
	version: '1.0.0',
	register: async (server, options) => {
		await server.register({
			plugin: require('hapi-mongodb'),
			options: {
				url: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.pwboz.mongodb.net/daniel?retryWrites=true&w=majority`,
				settings: {
					useUnifiedTopology: true,
					useNewUrlParser: true,
				},
				decorate: true,
			},
		});
	},
};
//mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000
