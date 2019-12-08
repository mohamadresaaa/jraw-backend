// tslint:disable-next-line: no-var-requires
require("dotenv").config()

export const config = {
    database: {
        mongodb: {
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            url: process.env.DATABASE_URL || "",
        },
    },
    server: {
        logLevel: process.env.LOG_LEVEL || "dev",
        port: process.env.PORT || 8000,
    },
}
