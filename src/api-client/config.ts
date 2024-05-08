import { Configuration } from '../api'
import { Env } from '../../env'
import { log } from './middlewares'
import { sendBeaconApi } from './sendBeaconApi'

export const config = new Configuration({
  fetchApi: sendBeaconApi,
  basePath: Env.basePath,
  middleware: [log],
})
