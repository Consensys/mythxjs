import axios from 'axios'

export async function submitAnalysis(url: string, body, headers: any) {
    return axios.post(url, body, { headers: headers })
}