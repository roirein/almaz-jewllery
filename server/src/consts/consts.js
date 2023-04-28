const HTTP_STATUS_CODES = {
    "SUCCESS": 200,
    "CREATED": 201,
    "NO_CONTENT": 204,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "CONFLICT": 409
}

const USER_COLUMNS_NAMES = {
    ID: 'id',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    BUSINESS_NAME: 'businessName',
    PHONE_ONE: 'phoneNumberOne',
    PHONE_TWO: 'phoneNumberTwo',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    APPROVED: 'Approved'
}

const ERROR_MESSAGES = {
    VALIDATION_FAIL_FIELD_EMPTY: (name) => `Field ${name} cannot be empty`,
    VALIDATION_FAILS_PASSWORD_CONFIRM: 'Password field is not the same as confirm password field',
    VALIDATION_FAIL_USER_EXIST: 'User already exist'
}

module.exports = {
    HTTP_STATUS_CODES,
    USER_COLUMNS_NAMES,
    ERROR_MESSAGES
}