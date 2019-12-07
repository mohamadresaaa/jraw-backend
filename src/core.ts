import bodyParser from "body-parser"
import express from "express"
import helmet from "helmet"
import { createServer } from "http"
import mongoose from "mongoose"

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
        server.listen(3000, () => console.log("Server running on port 3000"))
    }

    /** Setup mongodb and set config */
    private setupMongodb() {
        mongoose.Promise = global.Promise
        mongoose.connect("", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, (error) => console.log(error ? error.message : "Connect to database"))
    }

    /** Setup packages
     * @package helmet
     * @package body-parser
     */
    private configuration() {
        this.app.use(helmet())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: true }))
    }
}
