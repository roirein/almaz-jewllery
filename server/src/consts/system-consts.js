const ROLES = {
    MANAGER: 'manager',
    DESIGN_MANAGER: 'design_manager',
    PRODUCTION_MANAGER: 'production mangaer',
    EMPLOYEE: 'employee',
}

const USER_TYPES = {
    EMPLOYEE: 'employee',
    CUSTOMER: 'customer'
}

const ORDER_TYPES = {
    NEW_MODEL: 'new_model',
    EXISTING_MODEL: 'existing_model',
    FIX: 'fix'
}

const ORDER_STATUS = {
    CREATED: 'created',
    APPROVED: 'approved',
    CUSTOMER_APPROVAL: 'customer_approval',
    IN_DESIGN: 'in_design',
    IN_CASTINg: 'in_casting',
    IN_PRODUCTION: 'in_production',
    READY: 'ready',
    DELIVERED: 'delivered',
    COMPLETED: 'completed'
}

const MODEL_STATUS = {
    APPROVED: 'approved',
    NEEDS_WORK: 'needs_work',
    CREATED: 'created'
}

const DESIGN_STATUS = {
    CREATED: 'created',
    IN_PROGRESS: 'in_progress',
    MANAGER_REVIEW: 'manager_review',
    APPROVED: 'approved',
    COMPLETED: 'completed'
}

EMPLOYEES_FIELD = {
    JEWELER: 'jeweler',
    STUDDER: 'studder'
}

const CASTING_STATUS = {
    NOT_SENT: 'not_sent',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
}

const PRODUCTION_STATUS = {
    CREATED: 'created',
    JEWELER: 'jeweler',
    INLAYING: 'inlaying',
    FINISHING: 'finishing',
    QUALITY_ASSURANCE: 'quality_assurance',
    COMPLETED: 'completed'
}

module.exports = {
    USER_TYPES,
    ROLES,
    ORDER_STATUS,
    ORDER_TYPES,
    DESIGN_STATUS,
    MODEL_STATUS,
    CASTING_STATUS,
    PRODUCTION_STATUS
}