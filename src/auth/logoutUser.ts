import axios from 'axios'

export async function logoutUser(url: string) {
    return axios.post(url)
}  