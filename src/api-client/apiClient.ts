import { Configuration, DefaultApi } from '../api'
import { config } from './config'

class ApiClient {
  tracking: DefaultApi

  constructor(configuration?: Configuration) {
    this.tracking = new DefaultApi(configuration)
  }
}

const apiClient = new ApiClient(config)

export { apiClient }
