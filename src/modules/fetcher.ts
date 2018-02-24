import axios, { AxiosPromise } from 'axios'
interface Params {
  url: string
  method: string
  params: Object | any
  data: Object | any
}
const fetcher: Object = {
  _fetch(params: Params): AxiosPromise {
    return axios(params)
  },
}

export default fetcher
