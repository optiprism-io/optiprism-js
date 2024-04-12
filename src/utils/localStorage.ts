export class LocalStorage {
  static get(key: string): string | null {
    return window.localStorage.getItem(key)
  }

  static set(key: string, value: string): void {
    window.localStorage.setItem(key, value)
  }

  static getOrSet(key: string, value: string): string {
    let existingValue = this.get(key)
    if (existingValue === null) {
      this.set(key, value)
      return value
    } else {
      return existingValue
    }
  }
}
