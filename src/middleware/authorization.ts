import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import Session from "../models/session"
import { EStatus } from "../typings/enum/user"
import { IRequest } from "../typings/interface/express"
import ISession from "../typings/interface/session"
import { config } from "./../config"
import { ErrorMessage } from "./../lib/messages"

// Make sure the user is authenticated
export default async (req: IRequest, res: Response, next: NextFunction) => {
    try {
        // Get jwt token from header [x-access-token]
        const token: string | undefined = req.headers.authorization

        // If exists token, handle it
        if (token) {
            // Verify token
            const payload = jwt.verify(token,
                config.server.publicKey + config.server.privateKey,
                { issuer: "jraw" })

            // Find session in mongodb with jwt token and user.id and populate user collection
            const session: ISession | null = await Session.findOne({
                expiryDate: { $gt: new Date() },
                token,
                user: (payload as any).sub,
            }).populate("user")

            // If exists, handle it
            if (session) {
                if (session.user.status !== EStatus.block && session.user.status !== EStatus.inactive) {
                    // Set user to req.user and return next
                    req.user = session.user
                    return next()
                } else {
                    throw new ErrorMessage("Account status",
                        session.user.status === EStatus.inactive ?
                            "Your account is disabled Please activate your account" :
                            "Your account has been blocked See support for reviewing your account",
                        403)
                }
            } else {
                throw new ErrorMessage("Unauthorized", "Your session has expired", 401)
            }
        } else {
            throw new ErrorMessage("Unauthorized", "Authentication failed", 401)
        }
    } catch (error) {
        error = new ErrorMessage(error.name, "Authentication failed", 401)
        next(error)
    }
}
