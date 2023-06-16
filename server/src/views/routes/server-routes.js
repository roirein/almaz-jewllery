const serverUrl = process.env.SERVER_URL

export const getLoginUrl = () => {
    return `${serverUrl}/user/login`
}

export const getRegisterUrl = () => {
    return `${serverUrl}/user/register`
}