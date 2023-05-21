const REGISTERATION_MESSAGES = {
    INCORRECT_PASSWORD_CONFIRMATION: 'Password confirmation is not the same as the password',
    USER_EXIST: 'User already exists',
    USER_CREATED_SUCCESS: 'USer created successfully'
}

const LOGIN_MESSAGES = {
    EMPTY_FIELDS: 'Fields cannot be empty',
    INVALID_CREDENTIALS: 'Email or password are incorrect',
    LOGGED_IN_SUCCESSFULLY: 'User succesfully logged in'
}

const NOT_AUTHORIZED = {
    UNAUTHORIZED: 'Please authenticate to use the system'
}

module.exports = {
    REGISTERATION_MESSAGES,
    LOGIN_MESSAGES,
    NOT_AUTHORIZED
}