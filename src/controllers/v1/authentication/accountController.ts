import { NextFunction, Response } from "express"
import { PublicInfoMessage } from "../../../lib/messages"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"

export default new class AccountController extends BaseController {
    async activation(req: IRequest, res: Response, next: NextFunction) {
        this.showSuccessMessage(res, new PublicInfoMessage("account controller", 200))
    }
}
