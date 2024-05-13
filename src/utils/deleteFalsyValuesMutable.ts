export function deleteFalsyValuesMutable<T>(cloneObj: T): T {
  for (const key in cloneObj) {
    if (!cloneObj[key]) {
      delete cloneObj[key]
    } else if (typeof cloneObj[key] === 'object') {
      deleteFalsyValuesMutable(cloneObj[key])
    }
  }
  return cloneObj
}
