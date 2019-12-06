import express from "express"
import { createServer } from "http"

export default class ApplicationCore {
    /** @define app */
    private app: express.Application

    constructor() {
        this.app = express()
    }

    /** run all methods */
    public initialize() {
        this.setupExpress()
    }

    private setupExpress() {
        const server = createServer(this.app)
        server.listen(3000, () => console.log("server running on port 3000"))
    }
}
