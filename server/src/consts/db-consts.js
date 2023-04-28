const USER_TABLE_COLUMNS_NAMES = {
    ID: 'Id',
    FIRST_NAME: 'firstName',
    LAST_NAME: 'lastName',
    EMAIL: 'Email',
    PASSWORD: 'Password',
    TOKEN: 'Token'
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
    ROLE: 'Role'
}

module.exports = {
    USER_TABLE_COLUMNS_NAMES,
    CUSTOMER_TABLE_COLUMNS_NAMES,
    EMPLOYEE_TABLE_COLUMNS_NAMES
}

