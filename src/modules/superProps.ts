import { SUPER_PROPERTIES_KEY } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'

interface Options {
  overwrite: boolean
}

export interface SuperPropsData {
  [key: string]: unknown
}

export class SuperProps {
  static get(): SuperPropsData {
    return (LocalStorage.get(SUPER_PROPERTIES_KEY) as SuperPropsData | null) || {}
  }

  static set(data: SuperPropsData, options: Options = { overwrite: true }) {
    const savedProps = this.get()
    const clonedData = JSON.parse(JSON.stringify(data))

    const props = options.overwrite
      ? Object.assign(savedProps, clonedData)
      : Object.assign(clonedData, savedProps)

    LocalStorage.set(SUPER_PROPERTIES_KEY, props)
  }

  static remove(key: string) {
    const props = this.get()
    if (key in props) delete props[key]
    LocalStorage.set(SUPER_PROPERTIES_KEY, props)
  }

  static reset() {
    LocalStorage.remove(SUPER_PROPERTIES_KEY)
  }
}
