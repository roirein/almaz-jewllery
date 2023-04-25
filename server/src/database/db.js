const createTable = async (client) => {
    try {
        await client.query(`CREATE TABLE IF NOT EXISTS "customers" (
                            "id" SERIAL,
                            "firstName" VARCHAR(200),
                            "lastName" VARCHAR(200),
                            "businessName" VARCHAR(200),
                            "phoneNumberOne" VARCHAR(200) UNIQUE,
                            "phoneNumberTwo" VARCHAR(200) UNIQUE,
                            "Email" VARCHAR(200) UNIQUE,
                            "Password" VARCHAR(200),
                            "Approved" boolean DEFAULT False,
                            PRIMARY KEY("id")
                        )`)
    } catch (error) {
        console.log(error)
    } 
}

const createDB = async (client) => {
    await createTable(client)
    return true
}

module.exports = createDB