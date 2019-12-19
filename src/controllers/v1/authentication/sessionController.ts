import { NextFunction, Response } from "express"
import Session from "../../../models/session"
import { IRequest } from "../../../typings/interface/express"
import BaseController from "../baseController"
import { PublicInfoMessage } from "./../../../lib/messages"

export default new class SessionController extends BaseController {
    /** Find all sessions of user
     * @returns message and sessions
     */
    public async list(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Find sessions
            const sessions = await Session.find({
                token: { $ne: req.headers.authorization },
                user: req.user?.id,
            }).lean()

            // Return message and sessions
            return this.infoMessage(res, {
                message: "Get all sessions",
                properties: sessions,
                status: 200,
            })
        } catch (error) {
            next(error)
        }
    }

    /** Find session with id and remove it
     * @param id
     * @returns message
     */
    public async delete(req: IRequest, res: Response, next: NextFunction) {
        try {
            // Find and remove session with id
            await Session.findByIdAndRemove(req.params.id)

            // Return message
            return this.infoMessage(res, PublicInfoMessage.infoDeleted("Session"))
        } catch (error) {
            next(error)
        }
    }
}
