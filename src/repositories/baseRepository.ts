import models from "../models"
import { IModels } from "../typings/interface/models"

export default abstract class BaseRepository {
    /** @define models */
    protected models: IModels

    constructor() {
        this.models = { ...models }
    }

    async list(model: (keyof IModels), filter?: any, sort?: string) {
        return await this.models[model].find({ ...filter }).sort(sort).lean()
    }

}
