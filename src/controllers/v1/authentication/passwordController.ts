import { NextFunction, Response } from "express"
import { PublicInfoMessage } from "../../../lib/messages"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"

export default new class PasswordController extends BaseController {
    async forgotPassword(req: IRequest, res: Response, next: NextFunction) {
        this.showSuccessMessage(res, new PublicInfoMessage("password controller: forgotPassword", 200))
    }

    async resetPassword(req: IRequest, res: Response, next: NextFunction) {
        this.showSuccessMessage(res, new PublicInfoMessage("password controller: resetPassword", 200))
    }
}
