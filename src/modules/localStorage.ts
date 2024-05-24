export class LocalStorage {
  static get(key: string): unknown | null {
    return JSON.parse(window.localStorage.getItem(key) || String(null))
  }

  static set(key: string, value: unknown): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  static getOrSet(key: string, value: string): unknown {
    const existingValue = this.get(key)
    if (existingValue === null) {
      this.set(key, value)
      return value
    } else {
      return existingValue
    }
  }

  static remove(key: string): void {
    window.localStorage.removeItem(key)
  }
}
