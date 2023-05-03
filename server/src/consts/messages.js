const ERROR_MESSAGES = {
    VALIDATION_FAIL_FIELD_EMPTY: (name) => `Field ${name} cannot be empty`,
    VALIDATION_FAILS_PASSWORD_CONFIRM: 'Password field is not the same as confirm password field',
    VALIDATION_FAIL_USER_EXIST: 'User already exist',
    VALIDATION_FAILS_INVALID_EMAIL: 'Email is in a wrong format',
    VALIDATION_FAILS_INVALID_PHONE: 'Phone number is in a wrong format',
    LOGIN_FAILED_WRONG_CREDENTIALS: 'Email or Password is incorrect',
    LOGIN_FAILED_USER_NOT_APPROVED: 'System admin has not approved your request yet'
}

module.exports = {
    ERROR_MESSAGES
}