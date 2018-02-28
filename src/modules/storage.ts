import storage from 'electron-json-storage'
import { isEqual } from 'lodash'

const get = (key: string) => {
  return new Promise(resolve => {
    storage.get(key, (error, data) => {
      if (error) throw error
      if (isEqual(data, {})) resolve()
      resolve(data)
    })
  })
}

const set = (key: string, value: any) => {
  return new Promise(resolve => {
    storage.set(key, value, error => {
      if (error) throw error
      resolve()
    })
  })
}

export default {
  get,
  set,
}
