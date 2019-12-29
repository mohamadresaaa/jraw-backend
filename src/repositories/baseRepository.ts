import autoBind from "auto-bind"
import models from "../models"
import { IModels } from "../typings/interface/mongoose"

export default abstract class BaseRepository {
    /** @define models */
    protected models: IModels

    constructor() {
        // auto binding this
        autoBind(this)
        this.models = { ...models }
    }

}
