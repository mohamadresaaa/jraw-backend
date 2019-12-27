import models from "../models"
import { IModels } from "../typings/interface/mongoose"

export default abstract class BaseRepository {
    /** @define models */
    protected models: IModels

    constructor() {
        this.models = { ...models }
    }

}
