const HTTP_STATUS_CODES = {
    "SUCCESS": 200,
    "CREATED": 201,
    "NO_CONTENT": 204,
    "BAD_REQUEST": 400,
    "UNAUTHORIZED": 401,
    "FORBIDDEN": 403,
    "NOT_FOUND": 404,
    "CONFLICT": 409,
    "SERVER_ERROR": 500
}

const ROLES = {
    MANAGER: 'Manager',
    DESING_MANAGER: 'designManager',
    PRODUCTION_MANAGER: 'productionManager',
    EMPLOYEE: 'Employee'
}

const REQUEST_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
}

module.exports = {
    HTTP_STATUS_CODES,
    ROLES,
    REQUEST_STATUS
}