const USER_TABLE_COLUMNS_NAMES = {
    ID: 'Id',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    TOKEN: 'Token',
    SHOULD_REPLACE_PASSWORD: 'shouldReplacePassword',
    IS_CUSTOMER: 'isCustomer'
}

const CUSTOMER_TABLE_COLUMNS_NAMES = {
    USER_ID: 'UserId',
    CUSTOMER_ID: 'CustomerId',
    PHONE_ONE: 'phoneOnE',
    PHONE_TWO: 'phoneTwo',
    BUSINESS_NAME: 'businessName',
    APPROVED: 'Approved'
}

const EMPLOYEE_TABLE_COLUMNS_NAMES = {
    USER_ID: 'UserId',
    EMPLOYEE_ID: 'EmplyoeeId',
    PERMISSION_LEVEL: 'permissionLevel'
}

const REQUEST_TABLE_COLUMNS = {
    REQUEST_ID: 'requestId',
    REQUESTER_ID: 'requesterId',
    STATUS: 'status',
    CREATED: 'created',
    RESPONDED: 'responded'
}

module.exports = {
    USER_TABLE_COLUMNS_NAMES,
    CUSTOMER_TABLE_COLUMNS_NAMES,
    EMPLOYEE_TABLE_COLUMNS_NAMES,
    REQUEST_TABLE_COLUMNS
}

