exports.plugin = {
  name: 'dbRest',
  version: '1.0.0',
  register: async (server, options) => {
    await server.register(require('./mongo'))

    const DB = (col) => server.mongo.db.collection(col)

    server.method({
      name: 'getResources',
      method: (col, pipeline) => {
        //console.log('SERVER DB-REST', pipeline)
        return DB(col).aggregate(pipeline).toArray()
      },
    })
    server.method({
      name: 'getResource',
      method: async (col, query) => await DB(col).findOne(query),
    })
    server.method({
      name: 'saveResource',
      method: async (col, data) => await DB(col).insertOne(data),
    })
    server.method({
      name: 'updateResource',
      method: async (col, query, data) => {
        return DB(col).updateOne(query, [{ $set: data }])
      },
    })
    server.method({
      name: 'saveMany',
      method: async (col, data) =>
        await DB(col).insertMany(data, { ordered: false }),
    })
    server.method({
      name: 'addFoto',
      method: async (col, query, data) => {
        //console.log('QUERY', query)
        //console.log('DATA', data)
        return DB(col).updateOne(query, { $push: data })
      },
    })
  },
}
