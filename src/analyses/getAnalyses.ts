import axios from 'axios'

export async function getAnalyses(url: string, headers: any) {
    return axios.get(url, { headers: headers })
}  