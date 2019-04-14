import axios from 'axios'

// Utils
import { delay, getRequestHeaders } from '../utils'

export const analyze = async (data: {}, accessToken: string, url: string) => {
  const headers = getRequestHeaders(accessToken)

  try {
    const response = await axios.post(url, { data }, { headers })

    const uuidUrl = `${url}/${response.data.uuid}`
    let status = response.data.status

    // Initial status check
    if (status === 'Finished') {
      return getIssues(accessToken, `${uuidUrl}/issues`)
    }

    for (let i = 0; i < 10; i++) {
      await delay(3000)

      status = (await getStatus(accessToken, uuidUrl)).status

      if (status === 'Finished') {
        return getIssues(accessToken, `${uuidUrl}/issues`)
      }
    }
  } catch (err) {
    throw new Error(err.response.data.error)
  }
}

export const getIssues = (accessToken: string, url: string) => {
  const headers = getRequestHeaders(accessToken)

  return axios
    .get(url, { headers })
    .then(response => response.data)
    .catch(err => err)
}

export const getStatus = (accessToken: string, url: string) => {
  const headers = getRequestHeaders(accessToken)

  return axios
    .get(url, { headers })
    .then(response => response.data)
    .catch(err => err)
}
