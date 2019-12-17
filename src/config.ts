// tslint:disable-next-line: no-var-requires
require("dotenv").config()
import redis from "redis"

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
        redis: redis.createClient({ port: 6379 }),
    },
    server: {
        logLevel: process.env.LOG_LEVEL || "dev",
        port: process.env.PORT || 8000,
        privateKey: process.env.PRIVATE_KEY || "privateKey",
        publicKey: process.env.PUBLIC_KEY || "publicKey",
    },
}
