import axios from 'axios'

export async function logoutUser(url: string, headers: any) {
    return axios.post(url, {}, { headers: headers })
}  