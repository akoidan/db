/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import cassandraService from '#services/cassandra_service'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.get('/message', async () => {
  try {
    const result = await cassandraService.execute('SELECT * FROM test_table LIMIT 1')
    return {
      message: 'Data retrieved successfully',
      data: result.rows
    }
  } catch (error) {
    return {
      error: 'Failed to retrieve data',
      details: error.message
    }
  }
})
