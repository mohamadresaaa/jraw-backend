export class ErrorMessage extends Error {
    constructor(
        name: string,
        message: string,
        public status: number,
        public properties?: any,
        public internalProperties?: any) {
        super()
        this.name = name
        this.message = message
    }

    public publicVersion() {
        return new PublicErrorMessage(this)
    }

    static errNotFound(resource: string, properties?: any, internalProperties?: any) {
        return new ErrorMessage(
            `${resource} not found`,
            `The specified ${resource} does not exist`,
            404,
            properties,
            internalProperties)
    }
    static errServerError(properties?: any, internalProperties?: any) {
        return new ErrorMessage(
            "Internal Server Error",
            "Request could not be carried out.",
            500,
            properties,
            internalProperties)
    }
}

export class PublicErrorMessage {
    public name: string
    public message: string
    public status: number
    public properties?: any
    constructor(err: ErrorMessage) {
        this.name = err.name
        this.message = err.message
        this.status = err.status
        this.properties = err.properties
    }
}

export class PublicInfoMessage {
    constructor(
        public message: string,
        public status: number,
        public properties?: any,
    ) { }

    static infoCreated(resource: string, properties?: any) {
        return new PublicInfoMessage(`${resource} was Created`, 201, properties)
    }
    static infoUpdated(resource: string, properties?: any) {
        return new PublicInfoMessage(`${resource} was Updated`, 201, properties)
    }
    static infoDeleted(resource: string, properties?: any) {
        return new PublicInfoMessage(`${resource} was Deleted`, 204, properties)
    }
}
