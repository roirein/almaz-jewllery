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
    UPDATED: 'updated',
    CREATED: 'created',
    COMPLETED: 'completed'
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
    SETTER: 'setter'
}

const CASTING_STATUS = {
    NOT_SENT: 'not_sent',
    IN_PROGRESS: 'in_progress',
    COMPLETED: 'completed'
}

const PRODUCTION_STATUS = {
    CREATED: 'created',
    JEWELER: 'jeweler',
    SETTING: 'setting',
    FINISHING: 'finishing',
    QUALITY_ASSURANCE: 'quality_assurance',
    COMPLETED: 'completed'
}

const POSITIONS = {
    JEWELRY: 'jewelry',
    SETTING: 'setting',
    FINISHING: 'finishing',
    QUALITY_ASSURANCE: 'quality_assurance'
}

const NOTIFICATIONS_TYPES = {
    NEW_ORDER: 'new_order',
    NEW_MODEL_REQUEST: 'new_model_request',
    NEW_CUSTOMER: 'new_customer',
}

const REQUESTS_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected'
}

module.exports = {
    USER_TYPES,
    ROLES,
    ORDER_STATUS,
    ORDER_TYPES,
    DESIGN_STATUS,
    MODEL_STATUS,
    CASTING_STATUS,
    PRODUCTION_STATUS,
    POSITIONS,
    NOTIFICATIONS_TYPES,
    REQUESTS_STATUS
}