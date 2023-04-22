const createDatatbase = async (client) => {
    try {
        await client.query('CREATE DATABASE almaz_databse');
        return true;
    } catch (error) {
        console.log(error)
        return false
    }
}

const createTable = async (client) => {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS "customers" (
                            "id" SERIAL,
                            "firstName" VARCHAR(200),
                            "lastName" VARCHAR(200),
                            "businessName" VARCHAR(200),
                            "phoneNumberOne" VARCHAR(200),
                            "phoneNumberTwo" VARCHAR(200),
                            "Email" VARCHAR(200),
                            "Password" VARCHAR(200),
                            "Approved" boolean DEFAULT False,
                            PRIMARY KEY("id")
                        )`)
    } catch (error) {
        console.log(error)
    } 
}

const createDB = async (client) => {
    //await createDatatbase(client)
    await createTable(client)
    return true
}

module.exports = createDB