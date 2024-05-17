import { Context as IContext } from '../api'
import { name, version } from '../../package.json'
import { UTM_CONTENT, UTM_MEDIUM, UTM_NAME, UTM_SOURCE, UTM_TERM } from '@/constants'

export class Context implements IContext {
  library?: IContext['library']
  page?: IContext['page']
  userAgent?: IContext['userAgent']
  campaign?: IContext['campaign']

  constructor() {
    const path = location.pathname
    const referrer = document.referrer
    const search = location.search
    const title = document.title
    const url = location.href

    const URlSearchParams = new URL(url).searchParams
    const source = URlSearchParams.get(UTM_SOURCE)
    const medium = URlSearchParams.get(UTM_MEDIUM) || undefined
    const term = URlSearchParams.get(UTM_TERM) || undefined
    const content = URlSearchParams.get(UTM_CONTENT) || undefined
    const campaign = URlSearchParams.get(UTM_NAME) || undefined

    this.library = { name, version }
    this.page = { path, referrer, search, title, url }
    this.userAgent = navigator.userAgent
    if (source) this.campaign = { source, medium, term, content, name: campaign }

    // locale:
    //   navigator.languages && navigator.languages.length
    //     ? navigator.languages[0]
    //     : navigator.language,
    // screen: {
    //   width: window.innerWidth,
    //   height: window.innerHeight,
    // },
    // timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
}
