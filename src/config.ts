// tslint:disable-next-line: no-var-requires
require("dotenv").config()

export const config = {
    database: {
        mongodb: {
            options: {
                useCreateIndex: true,
                useFindAndModify: false,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            url: process.env.DATABASE_URL || "mongodb://127.0.0.1:27017/jrawDB",
        },
    },
    server: {
        logLevel: process.env.LOG_LEVEL || "dev",
        port: process.env.PORT || 4000,
        privateKey: process.env.PRIVATE_KEY || "privateKey",
        publicKey: process.env.PUBLIC_KEY || "publicKey",
    },
}
