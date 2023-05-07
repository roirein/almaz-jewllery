const DB_TABLES = {
    USERS: 'users',
    EMPLOYEES: 'employees',
    CUSTOMERS: 'customers',
    CODES: 'codes',
    NOTIFICATIONS: 'notifications',
    ORDERS: 'orders',
    ORDERS_IN_CASTING: 'orders_in_casting',
    ORDERS_IN_DESIGN: 'order_in_design',
    ORDERS_IN_PRODUCTION: 'orders_in_productioon',
    FIX_ORDERS: 'fix_orders',
    NEW_MODELS_ORDERS: 'new_models_orders',
    EXISTING_MODEL_ORDERS: 'existung_model_orders',
    ORDERS_TIMELINE: 'orders_timeline',
    MODELS: 'models',
    MODELS_COMMENTS: 'models_comments',
    TASKS: 'tasks'
}

const USER_TABLE_COLUMN = {
    ID: 'user_id',
    FIRST_NAME: 'first_name',
    LAST_NAME: 'last_name',
    EMAIL: 'email',
    PHONE: 'phone',
    PASSWORD: 'password',
    TYPE: 'type',
    TOKEN: 'token'
}

const EMPLOYEE_TABLE_COLUMN = {
    USER_ID: 'user_id',
    ROLE: 'role',
    SHOULD_REPLACE_PASSWORD: 'should_replace_password'
}

const CUSTOMER_TABLE_COLUMN = {
    USER_ID: 'user_id',
    BUSINESS_NAME: 'business_name',
    SECONDARY_PHONE: 'secondary_phone',
    IS_APPROVED: 'is_approved'
}

const CODES_TABLE_COLUMNS = {
    USER_ID: 'user_id',
    CODE: 'code',
    EXPIRY_TIME: 'expiry_time'
}

const NOTIFICATIONS_TABLE_COLUMNS = {
    NOTIFICATION_ID: 'notification_id',
    RECIPIENT: 'recipient',
    CONTENT: 'content',
    CREATED: 'created'
}

const ORDERS_TABLE_COLUMNS = {
    ORDER_ID: 'order_id',
    CUSTOMER_ID: 'customer_id',
    CUSTOMER_NAME: 'customer_name',
    TYPE: 'type',
    STATUS: 'status',
    PRICE: 'price',
    DEADLINE: 'deadline',
    ACTUAL_COMPLETION_TIME: 'actual_completion_time',
    IS_CASTING_REQUIRED: 'is_casting_required'
}

const NEW_MODELS_ORDERS = {
    ORDER_ID: 'order_id',
    ITEM: 'item',
    METAL: 'metal',
    SIZE: 'size',
    INLAY: 'inlay',
    SIDE_STONE: 'side_stone',
    MAIN_STONE: 'main_stone', 
    IMAGE: 'image',
    COMMENTS: 'comments'
}

const EXISTING_MODEL_ORDERS = {
    ORDER_ID: 'order_id',
    ITEM: 'item',
    METAL: 'metal',
    SIZE: 'size',
    MODEL_NUMBER: 'model_number',
    COMMENTS: 'comments',
    WAS_ORIGINALLY_NEW_MODEL: 'was_originally_new_model'
}

const FIX_ORDER = {
    ORDER_ID: 'order_id',
    DESCRIPTION: 'description',
    ITEM: 'item'
}

const ORDERS_IN_DESIGN = {
    ORDER_ID: 'order_id',
    DESIGN_STATUS: 'design_status',
}

const ORDERS_IN_CASTING = {
    ORDER_ID: 'order_id',
    CASTING_STATUS: 'casting_status'
}

const ORDERS_IN_PRODUCTION = {
    ORDER_ID: 'order_id',
    PRODUCTION_STATUS: 'production_status'
}

const ORDER_TIMELINE = {
    ORDER_ID: 'order_id',
    CREATED: 'created',
    DESIGN_START: 'design_start',
    DESIGN_COMPLETION: 'design_completion',
    CUSTOMER_APPROVAL: 'customer_approval',
    CASTING_START: 'casting_start',
    CASTING_COMPLETION: 'casting_completion',
    PRODUCTION_START: 'production_start',
    PRODUCTION_COMPLETION: 'production_completion',
    ORDER_COMEPLETION: 'order_completion',
    ORDER_DELIVERY: 'order_delivery'
}

const MODEL = {
    MODEL_NUMBER: 'model_number',
    ITEM: 'item',
    INLAY: 'inlay',
    SIDE_STONE: 'side_stone',
    MAIN_STONE: 'main_stone',
    INITIAL_DESIGN: 'initial_design',
    FINAL_DESIGN: 'final_design',
    DESCRIPTION: 'description',
    MATERIALS: 'materials',
    PRICE_WITH_MATERIALS: 'price_with_materials',
    PRICE_WITHOUT_MATERIALS: 'price_without_materials'
}

const NEW_MODEL_COMMENTS = {
    COMMENT_ID: 'comment_id',
    MODEL_NUMBER: 'model_number',
    MANAGER_COMMENNTS: 'manager_comments',
    IMAGE: 'image'
}

const TASKS = {
    TASK_ID: 'task_id',
    USER_ID: 'user_id',
    ORDER_ID: 'order_id',
    DESCRIPTION: 'description',
    STATUS: 'status'
}


module.exports = {
    DB_TABLES,
    USER_TABLE_COLUMN,
    CUSTOMER_TABLE_COLUMN,
    EMPLOYEE_TABLE_COLUMN,
    CODES_TABLE_COLUMNS,
    NOTIFICATIONS_TABLE_COLUMNS,
    ORDERS_TABLE_COLUMNS,
    NEW_MODELS_ORDERS,
    EXISTING_MODEL_ORDERS,
    FIX_ORDER,
    ORDERS_IN_DESIGN,
    ORDERS_IN_CASTING,
    ORDERS_IN_PRODUCTION,
    ORDER_TIMELINE,
    MODEL,
    NEW_MODEL_COMMENTS,
    TASKS
}