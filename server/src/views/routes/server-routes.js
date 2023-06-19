const serverUrl = process.env.SERVER_URL

export const getLoginUrl = () => {
    return `${serverUrl}/user/login`
}

export const getRegisterUrl = () => {
    return `${serverUrl}/user/register`
}

export const getResetPasswordCodeURL = () => {
    return `${serverUrl}/user/sendResetPasswordCode`
}

export const getCodeVerificationUrl = () => {
    return `${serverUrl}/user/verifyPasswordCode`
}

export const getUpdatePasswordUrl = () => {
    return `${serverUrl}/user/resetPassword`
}

export const getRequestUrl = () => {
    return `${serverUrl}/customer/getCustomerRequests`
}

export const getUserRequestUrl = (id) => {
    return `${serverUrl}/customer/getCustomerRequestById/${id}`
}

export const getApproveUserUrl = (id) => {
    return `${serverUrl}/customer/approveCustomer/${id}`
}

export const getCustomersUrl = () => {
    return `${serverUrl}/customer/getCustomers`
}