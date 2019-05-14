export function errorHandler(err) {
    const { status, error } = err.response.data

    if (status && error) {
        throw new Error(`${status} ${error}`)
    } else {
        throw new Error(`Error with your request. ${err}`)
    }

}