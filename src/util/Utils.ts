export function exclude(obj: any, ...keys: any[]) {
    for (let key of keys) {
      delete obj[key]
    }
    return obj
}