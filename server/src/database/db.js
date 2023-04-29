const {USER_TABLE_COLUMNS_NAMES, CUSTOMER_TABLE_COLUMNS_NAMES, EMPLOYEE_TABLE_COLUMNS_NAMES} = require('../consts/db-consts');

const createUserTable = async (client) => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS "users" (
                "${USER_TABLE_COLUMNS_NAMES.ID}" VARCHAR(100) UNIQUE,
                "${USER_TABLE_COLUMNS_NAMES.FIRST_NAME}" VARCHAR(20),
                "${USER_TABLE_COLUMNS_NAMES.LAST_NAME}" VARCHAR(20),
                "${USER_TABLE_COLUMNS_NAMES.EMAIL}" VARCHAR(100) UNIQUE,
                "${USER_TABLE_COLUMNS_NAMES.PASSWORD}" VARCHAR(100),
                "${USER_TABLE_COLUMNS_NAMES.TOKEN}" VARCHAR(200) DEFAULT NULL,
                "${USER_TABLE_COLUMNS_NAMES.SHOULD_REPLACE_PASSWORD}" BOOLEAN,
                PRIMARY KEY("${USER_TABLE_COLUMNS_NAMES.ID}") 
            );`
        )
    } catch (e) {
        return;
    }
}

const createCustomerTable = async (client) => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS "customers" (
                "${CUSTOMER_TABLE_COLUMNS_NAMES.USER_ID}" VARCHAR(100) UNIQUE,
                "${CUSTOMER_TABLE_COLUMNS_NAMES.CUSTOMER_ID}" VARCHAR(100) UNIQUE,
                "${CUSTOMER_TABLE_COLUMNS_NAMES.PHONE_ONE}" VARCHAR(100) UNIQUE,
                "${CUSTOMER_TABLE_COLUMNS_NAMES.PHONE_TWO}" VARCHAR(100) DEFAULT NULL,
                "${CUSTOMER_TABLE_COLUMNS_NAMES.BUSINESS_NAME}" VARCHAR(100),
                "${CUSTOMER_TABLE_COLUMNS_NAMES.APPROVED}" BOOLEAN DEFAULT FALSE,
                PRIMARY KEY ("${CUSTOMER_TABLE_COLUMNS_NAMES.CUSTOMER_ID}"),
                CONSTRAINT fk_user_id 
                    FOREIGN KEY ("${CUSTOMER_TABLE_COLUMNS_NAMES.USER_ID}")
                    REFERENCES "users" ("${USER_TABLE_COLUMNS_NAMES.ID}")
            );`
        )
    } catch(e){
       return
    }
}

const createEmployeeTable = async (client) => {
    try {
        await client.query(
            `CREATE TABLE IF NOT EXISTS "employees" (
                "${EMPLOYEE_TABLE_COLUMNS_NAMES.USER_ID}" VARCHAR(100) UNIQUE,
                "${EMPLOYEE_TABLE_COLUMNS_NAMES.EMPLOYEE_ID}" VARCHAR(100) UNIQUE,
                "${EMPLOYEE_TABLE_COLUMNS_NAMES.PERMISSION_LEVEL}" INT,
                PRIMARY KEY ("${EMPLOYEE_TABLE_COLUMNS_NAMES.EMPLOYEE_ID}"),
                CONSTRAINT fk_user_id 
                    FOREIGN KEY ("${EMPLOYEE_TABLE_COLUMNS_NAMES.USER_ID}")
                    REFERENCES "users" ("${USER_TABLE_COLUMNS_NAMES.ID}")
            );`
        )
    } catch (e) {
        return
    }
}
 


const createDB = async (client) => {
    await createUserTable(client);
    await createCustomerTable(client);
    await createEmployeeTable(client);
    return true;
}

module.exports = createDB