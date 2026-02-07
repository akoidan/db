import { ApplicationService } from '@adonisjs/core/types'
import cassandraService from '#services/cassandra_service'

declare module '@adonisjs/core/types' {
  export interface ContainerBindings {
    cassandra: typeof cassandraService
  }
}

export default class CassandraProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    this.app.container.singleton('cassandra', () => cassandraService)
  }

  async boot() {
    await cassandraService.connect()
  }
}
