export function deleteFalsyValuesMutable(cloneObj: any): any {
  for (let key in cloneObj) {
    if (!cloneObj[key]) {
      delete cloneObj[key]
    } else if (typeof cloneObj[key] === 'object') {
      deleteFalsyValuesMutable(cloneObj[key])
    }
  }
  return cloneObj
}
