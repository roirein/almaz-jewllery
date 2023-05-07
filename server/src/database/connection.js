const {Pool} = require('pg');
const dbConsts = require('../consts/db-consts')

const initialPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
});

const createDBQuery = `CREATE DATABASE ${process.env.DB_NAME}`

const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.USERS}" (
        "${dbConsts.USER_TABLE_COLUMN.ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.USER_TABLE_COLUMN.FIRST_NAME}" VARCHAR(15) NOT NULL,
        "${dbConsts.USER_TABLE_COLUMN.LAST_NAME}" VARCHAR(30) NOT NULL,
        "${dbConsts.USER_TABLE_COLUMN.EMAIL}" VARCHAR(50) NOT NULL UNIQUE,
        "${dbConsts.USER_TABLE_COLUMN.PHONE}" VARCHAR(15) NOT NULL UNIQUE,
        "${dbConsts.USER_TABLE_COLUMN.PASSWORD}" VARCHAR(100) NOT NULL,
        "${dbConsts.USER_TABLE_COLUMN.TYPE}" VARCHAR(10) NOT NULL,
        "${dbConsts.USER_TABLE_COLUMN.TOKEN}" VARCHAR(255),
        PRIMARY KEY ("${dbConsts.USER_TABLE_COLUMN.ID}")
    );`

const createCustomerTableQuery =  `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.CUSTOMERS}" (
        "${dbConsts.CUSTOMER_TABLE_COLUMN.USER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.CUSTOMER_TABLE_COLUMN.BUSINESS_NAME}" VARCHAR(20) NOT NULL UNIQUE,
        "${dbConsts.CUSTOMER_TABLE_COLUMN.SECONDARY_PHONE}" VARCHAR(15) UNIQUE,
        "${dbConsts.CUSTOMER_TABLE_COLUMN.IS_APPROVED}" BOOLEAN DEFAULT FALSE,
        PRIMARY KEY ("${dbConsts.CUSTOMER_TABLE_COLUMN.USER_ID}"),
        CONSTRAINT fk_user_id 
            FOREIGN KEY ("${dbConsts.CUSTOMER_TABLE_COLUMN.USER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.USERS}" ("${dbConsts.USER_TABLE_COLUMN.ID}")
    );`

const createEmployeesTableQuery = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.EMPLOYEES}" (
        "${dbConsts.EMPLOYEE_TABLE_COLUMN.USER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.EMPLOYEE_TABLE_COLUMN.ROLE}" VARCHAR(20) NOT NULL,
        "${dbConsts.EMPLOYEE_TABLE_COLUMN.SHOULD_REPLACE_PASSWORD}" BOOLEAN DEFAULT TRUE,
        PRIMARY KEY ("${dbConsts.EMPLOYEE_TABLE_COLUMN.USER_ID}"),
        CONSTRAINT fk_user_id 
            FOREIGN KEY ("${dbConsts.EMPLOYEE_TABLE_COLUMN.USER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.USERS}" ("${dbConsts.USER_TABLE_COLUMN.ID}")
    );`

const createCodesTable = `
        CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.CODES}" (
            "${dbConsts.CODES_TABLE_COLUMNS.USER_ID}" VARCHAR(255) NOT NULL,
            "${dbConsts.CODES_TABLE_COLUMNS.CODE}" VARCHAR(10) NOT NULL UNIQUE,
            "${dbConsts.CODES_TABLE_COLUMNS.EXPIRY_TIME}" TIMESTAMP NOT NULL,
            PRIMARY KEY ("${dbConsts.CODES_TABLE_COLUMNS.USER_ID}")
        );`

const createNotificationsTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.NOTIFICATIONS}" (
        "${dbConsts.NOTIFICATIONS_TABLE_COLUMNS.NOTIFICATION_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.NOTIFICATIONS_TABLE_COLUMNS.CONTENT}" VARCHAR(255) NOT NULL,
        "${dbConsts.NOTIFICATIONS_TABLE_COLUMNS.RECIPIENT}" VARCHAR(255) NOT NULL,
        "${dbConsts.NOTIFICATIONS_TABLE_COLUMNS.CREATED}" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY ("${dbConsts.NOTIFICATIONS_TABLE_COLUMNS.NOTIFICATION_ID}")
    );`

const createModelsTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.MODELS}" (
        "${dbConsts.MODEL.MODEL_NUMBER}" VARCHAR(20) NOT NULL UNIQUE,
        "${dbConsts.MODEL.ITEM}" VARCHAR(20) NOT NULL,
        "${dbConsts.MODEL.INLAY}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.SIDE_STONE}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.MAIN_STONE}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.INITIAL_DESIGN}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.FINAL_DESIGN}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.DESCRIPTION}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.MATERIALS}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.PRICE_WITH_MATERIALS}" VARCHAR(255) NOT NULL,
        "${dbConsts.MODEL.PRICE_WITHOUT_MATERIALS}" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("${dbConsts.MODEL.MODEL_NUMBER}")
    );`

const createModelCommentsTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.MODELS_COMMENTS}" (
        "${dbConsts.NEW_MODEL_COMMENTS.COMMENT_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.NEW_MODEL_COMMENTS.MODEL_NUMBER}" VARCHAR(20) NOT NULL,
        "${dbConsts.NEW_MODEL_COMMENTS.MANAGER_COMMENNTS}" VARCHAR(255) NOT NULL,
        "${dbConsts.NEW_MODEL_COMMENTS.IMAGE}" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("${dbConsts.NEW_MODEL_COMMENTS.COMMENT_ID}"),
        CONSTRAINT fk_model_number
            FOREIGN KEY ("${dbConsts.EXISTING_MODEL_ORDERS.MODEL_NUMBER}")
            REFERENCES "${dbConsts.DB_TABLES.MODELS}" ("${dbConsts.MODEL.MODEL_NUMBER}")
    );`

const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.ORDERS}" (
        "${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.ORDERS_TABLE_COLUMNS.CUSTOMER_ID}" VARCHAR(255) NOT NULL,
        "${dbConsts.ORDERS_TABLE_COLUMNS.CUSTOMER_NAME}" VARCHAR(20) NOT NULL,
        "${dbConsts.ORDERS_TABLE_COLUMNS.TYPE}" VARCHAR(10) NOT NULL,
        "${dbConsts.ORDERS_TABLE_COLUMNS.STATUS}" VARCHAR(10) NOT NULL,
        "${dbConsts.ORDERS_TABLE_COLUMNS.PRICE}" VARCHAR(100) DEFAULT NULL,
        "${dbConsts.ORDERS_TABLE_COLUMNS.DEADLINE}" TIMESTAMP NOT NULL,
        "${dbConsts.ORDERS_TABLE_COLUMNS.IS_CASTING_REQUIRED}" BOOLEAN NOT NULL DEFAULT FALSE,
        "${dbConsts.ORDERS_TABLE_COLUMNS.ACTUAL_COMPLETION_TIME}" TIMESTAMP,
        PRIMARY KEY ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}"),
        CONSTRAINT fk_customer_id
            FOREIGN KEY ("${dbConsts.ORDERS_TABLE_COLUMNS.CUSTOMER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.USERS}" ("${dbConsts.USER_TABLE_COLUMN.ID}")
    );`

const createNewModelOrdersTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.NEW_MODELS_ORDERS}" (
        "${dbConsts.NEW_MODELS_ORDERS.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.NEW_MODELS_ORDERS.ITEM}" VARCHAR(20) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.SIZE}" VARCHAR(20) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.METAL}" VARCHAR(20) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.INLAY}" VARCHAR(255) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.SIDE_STONE}" VARCHAR(255) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.MAIN_STONE}" VARCHAR(255) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.IMAGE}" VARCHAR(255) NOT NULL,
        "${dbConsts.NEW_MODELS_ORDERS.COMMENTS}" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("${dbConsts.NEW_MODELS_ORDERS.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.NEW_MODELS_ORDERS.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`

const createExistingModelOrdersTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.EXISTING_MODEL_ORDERS}" (
        "${dbConsts.EXISTING_MODEL_ORDERS.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.EXISTING_MODEL_ORDERS.MODEL_NUMBER}" VARCHAR(20) NOT NULL,
        "${dbConsts.EXISTING_MODEL_ORDERS.ITEM}" VARCHAR(20) NOT NULL,
        "${dbConsts.EXISTING_MODEL_ORDERS.SIZE}" VARCHAR(20) NOT NULL,
        "${dbConsts.EXISTING_MODEL_ORDERS.METAL}" VARCHAR(20) NOT NULL,
        "${dbConsts.EXISTING_MODEL_ORDERS.COMMENTS}" VARCHAR(255) NOT NULL,
        "${dbConsts.EXISTING_MODEL_ORDERS.WAS_ORIGINALLY_NEW_MODEL}" BOOLEAN DEFAULT FALSE,
        PRIMARY KEY ("${dbConsts.NEW_MODELS_ORDERS.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.EXISTING_MODEL_ORDERS.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}"),
        CONSTRAINT fk_model_number
            FOREIGN KEY ("${dbConsts.EXISTING_MODEL_ORDERS.MODEL_NUMBER}")
            REFERENCES "${dbConsts.DB_TABLES.MODELS}" ("${dbConsts.MODEL.MODEL_NUMBER}")
    );`

const createFixOrderTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.FIX_ORDERS}" (
        "${dbConsts.FIX_ORDER.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.FIX_ORDER.ITEM}" VARCHAR(20) NOT NULL,
        "${dbConsts.FIX_ORDER.DESCRIPTION}" VARCHAR(255) NOT NULL,
        PRIMARY KEY ("${dbConsts.FIX_ORDER.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.FIX_ORDER.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`

const createOdersInDesignTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.ORDERS_IN_DESIGN}" (
        "${dbConsts.ORDERS_IN_DESIGN.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.ORDERS_IN_DESIGN.DESIGN_STATUS}" VARCHAR(20) NOT NULL,
        PRIMARY KEY ("${dbConsts.ORDERS_IN_DESIGN.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.ORDERS_IN_DESIGN.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`   

const createOrdersInCastingTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.ORDERS_IN_CASTING}" (
        "${dbConsts.ORDERS_IN_CASTING.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.ORDERS_IN_CASTING.CASTING_STATUS}" VARCHAR(20) NOT NULL,
        PRIMARY KEY ("${dbConsts.ORDERS_IN_CASTING.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.ORDERS_IN_CASTING.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`     


const createOrdersInProductionTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.ORDERS_IN_PRODUCTION}" (
        "${dbConsts.ORDERS_IN_PRODUCTION.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.ORDERS_IN_PRODUCTION.PRODUCTION_STATUS}" VARCHAR(20) NOT NULL,
        PRIMARY KEY ("${dbConsts.ORDERS_IN_DESIGN.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.ORDERS_IN_PRODUCTION.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`   

const createOrdersTimelineTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.ORDERS_TIMELINE}" (
        "${dbConsts.ORDER_TIMELINE.ORDER_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.ORDER_TIMELINE.CREATED}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.CUSTOMER_APPROVAL}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.DESIGN_START}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.DESIGN_COMPLETION}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.CASTING_START}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.CASTING_COMPLETION}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.PRODUCTION_START}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.PRODUCTION_COMPLETION}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.ORDER_DELIVERY}" TIMESTAMP DEFAULT NULL,
        "${dbConsts.ORDER_TIMELINE.ORDER_COMEPLETION}" TIMESTAMP DEFAULT NULL,
        PRIMARY KEY ("${dbConsts.ORDER_TIMELINE.ORDER_ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.ORDER_TIMELINE.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`    

const createTasksTable = `
    CREATE TABLE IF NOT EXISTS "${dbConsts.DB_TABLES.TASKS}" (
        "${dbConsts.TASKS.TASK_ID}" VARCHAR(255) NOT NULL UNIQUE,
        "${dbConsts.TASKS.USER_ID}" VARCHAR(255) NOT NULL,
        "${dbConsts.TASKS.ORDER_ID}" VARCHAR(255) NOT NULL,
        "${dbConsts.TASKS.DESCRIPTION}" VARCHAR(255) NOT NULL,
        "${dbConsts.TASKS.STATUS}" VARCHAR(20) NOT NULL,
        PRIMARY KEY ("${dbConsts.TASKS.TASK_ID}"),
        CONSTRAINT fk_user_id
            FOREIGN KEY ("${dbConsts.TASKS.USER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.USERS}" ("${dbConsts.USER_TABLE_COLUMN.ID}"),
        CONSTRAINT fk_order_id
            FOREIGN KEY ("${dbConsts.TASKS.ORDER_ID}")
            REFERENCES "${dbConsts.DB_TABLES.ORDERS}" ("${dbConsts.ORDERS_TABLE_COLUMNS.ORDER_ID}")
    );`

const queries = [
    createUsersTableQuery,
    createCustomerTableQuery,
    createEmployeesTableQuery,
    createCodesTable,
    createNotificationsTable,
    createModelsTable,
    createModelCommentsTable,
    createOrdersTable,
    createNewModelOrdersTable,
    createExistingModelOrdersTable,
    createFixOrderTable,
    createOdersInDesignTable,
    createOrdersInCastingTable,
    createOrdersInProductionTable,
    createOrdersTimelineTable,
    createTasksTable
]

const runCreateDbQuery = async () => {
    try {
        await initialPool.query(createDBQuery);
    } catch(e) {
        return
    }
}

const createDatabase = async () => {
    await runCreateDbQuery()
    const pool = new Pool({
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    });
    for (let i = 0; i < queries.length; i++) {
        await pool.query(queries[i])
    }
}

createDatabase().then(() => {
    console.log('db created')
})


//module.exports = pool;