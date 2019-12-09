// import autoBind from "auto-bind"
import { Response } from "express"
import { ErrorMessage, PublicInfoMessage } from "src/lib/messages"

export default abstract class BaseController {
    // constructor() {
    //     autoBind(this)
    // }

    /** Show error message
     * @param {object} error
     * @returns error
     */
    showErrorMessage(error: ErrorMessage) {
        throw error
    }

    /** Show success message
     * @param {response} res
     * @param {object} data
     * @returns {response} res.status(200).json({ message, status, properties })
     */
    showSuccessMessage(res: Response, data: PublicInfoMessage) {
        return res.status(data.status).json(data)
    }

}
