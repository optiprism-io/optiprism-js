import { SUPER_PROPERTIES_KEY } from '@/constants'
import { LocalStorage } from '@/modules/localStorage'

interface Options {
  overwrite: boolean
}

export interface SuperPropsData {
  [key: string]: unknown
}

export class SuperProps {
  static get() {
    return LocalStorage.get(SUPER_PROPERTIES_KEY) || {}
  }

  static set(data: SuperPropsData, options: Options = { overwrite: true }) {
    const savedProps = this.get()
    const clonedData = JSON.parse(JSON.stringify(data))

    const props = options.overwrite
      ? Object.assign(savedProps, clonedData)
      : Object.assign(clonedData, savedProps)

    LocalStorage.set(SUPER_PROPERTIES_KEY, props)
  }

  static reset() {
    LocalStorage.remove(SUPER_PROPERTIES_KEY)
  }
}
