import { NextFunction, Response } from "express"
import { PublicInfoMessage } from "../../../lib/messages"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"

export default new class RegisterController extends BaseController {
    async local(req: IRequest, res: Response, next: NextFunction) {
        this.showSuccessMessage(res, new PublicInfoMessage("register controller", 200))
    }
}
