const ROLES = {
    MANAGER: 'manager',
    DESIGN_MANAGER: 'design_manager',
    PRODUCTION_MANAGER: 'production_mangaer',
    EMPLOYEE: 'employee',
}

const ORDER_STATUS = {
    CREATED: 'created',
    APPROVED: 'approved',
    IN_DESIGN: 'in_design',
    IN_CASTINg: 'in_casting',
    IN_PRODUCTION: 'in_production',
    READY: 'ready',
    DELIVERED: 'delivered',
    COMPLETED: 'completed'
}

const DESIGN_STATUS = {
    created: 'created',
    IN_PROGRESS: 'in_progress',
    MANAGER_REVIEW: 'manager_review',
    APPROVED: 'approved',
    COMPLETED: 'completed'
}

const CASTING_STATUS = {
    SENT: 'sent',
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