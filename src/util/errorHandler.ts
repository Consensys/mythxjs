export function errorHandler(err) {
    const { response } = err

    if (response.status === 400) {
        throw new Error(`Bad request. ${err}`)
    }
    else if (response.status === 401) {
        throw new Error(`Error ${response.status}: Unauthorized — Probably an empty or invalid authorization header sent with the request.`)
    }
    else if (response.status === 429) {
        throw new Error(`Error ${response.status}: Too many requests — You have either reached the API usage limit allowed to your user and subscription types or the maximum request allowed per client and second.`)
    }
    else if (response.status === 500) {
        throw new Error(`Error ${response.status}: Internal server error — An unexpected error happened at the server side when trying to fulfil your request.`)
    }
    else {
        throw new Error(`Error with your request. ${err}`)
    }
}