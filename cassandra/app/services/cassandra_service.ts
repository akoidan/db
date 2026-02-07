import cassandra from 'cassandra-driver'

class CassandraService {
  private client: cassandra.Client

  constructor() {
    this.client = new cassandra.Client({
      contactPoints: ['127.0.0.1'],
      localDataCenter: 'datacenter1',
      keyspace: 'testks',
    })
  }

  async connect() {
    await this.client.connect()
    console.log('Connected to Cassandra')
  }

  async execute(query: string, params?: any[]) {
    return await this.client.execute(query, params)
  }

  getClient() {
    return this.client
  }
}

export default new CassandraService()
