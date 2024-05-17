function isEmpty(value: unknown): boolean {
  if (value == null) return true
  if (Array.isArray(value)) return value.length === 0
  if (typeof value === 'object') return Object.keys(value).length === 0
  if (typeof value === 'string') return value === ''
  return false
}

/**
 * Deletes values: null, undefined, [], {}, ''  from the provided object or array.
 *
 * @template T - The type of the object or array.
 * @param {T} obj - The object or array to clean.
 * @returns {T} - Returns the cleaned object or array.
 */
export function cleanEmptyValues<T>(obj: T): T {
  if (typeof obj !== 'object' || obj === null) return obj

  if (Array.isArray(obj)) {
    // If the object is an array, clean each element recursively and filter out empty ones
    return obj.map(cleanEmptyValues).filter(el => !isEmpty(el)) as unknown as T
  } else {
    // If the object is an object, clean each property recursively
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const cleanedValue = cleanEmptyValues(value)
      if (!isEmpty(cleanedValue)) {
        // @ts-expect-error - We know that the key is a string
        acc[key] = cleanedValue
      }
      return acc
    }, {} as T)
  }
}
