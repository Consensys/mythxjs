import axios from 'axios'

// Constants
import { API_URL, VERSION_API } from '../constants'

export const getVersion = () => {
  return axios.get(API_URL.staging + VERSION_API)
}
