import bodyParser from "body-parser"
import express from "express"
import helmet from "helmet"
import { createServer } from "http"
import mongoose from "mongoose"
import morgan from "morgan"
import logger from "./utilities/logger"

export default class ApplicationCore {
    /** @define app */
    private app: express.Application

    constructor() {
        this.app = express()
    }

    /** Run all methods */
    public initialize() {
        this.setupExpress()
        this.setupMongodb()
        this.configuration()
    }

    /** Setup server with express */
    private setupExpress() {
        const server = createServer(this.app)
        server.listen(5000, () => logger("Server running on port 3000"))
    }

    /** Setup mongodb and set config */
    private setupMongodb() {
        mongoose.Promise = global.Promise
        mongoose.connect("", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (error) => logger(error ? error.message : "Connect to database", error ? "red" : undefined))
    }

    /** Setup packages
     * @package helmet
     * @package body-parser
     */
    private configuration() {
        this.app.use(helmet())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
        this.app.use(morgan("dev"))
    }
}
