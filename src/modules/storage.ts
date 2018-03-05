import storage from 'electron-json-storage'
import { isEqual } from 'lodash'

const keys = {
  CLIENT_TOKEN: 'clientToken',
  PREFERENCES: 'preferences',
}

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

const clear = () => {
  return new Promise(resolve => {
    storage.clear(error => {
      if (error) throw error
      resolve()
    })
  })
}

const getClientToken = async (): Promise<string> => {
  const token: any = await get(keys.CLIENT_TOKEN)
  return token
}

export default {
  get,
  set,
  clear,
  keys,
  getClientToken,
}
