import { NextFunction, Response } from "express"
import jwt from "jsonwebtoken"
import Session from "../models/session"
import User from "../models/user"
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

            /** Find session in redis, if exists key return next
             * if not find session in mongodb, if exists create key and return next
             * otherwise next error
             */
            config.database.redis.get(`session-${token}`, async (err, key) => {
                try {
                    if (key) {
                        // set value of key to req.user and return next
                        req.user = JSON.parse(key)
                        return next()
                    } else {
                        // Find session in mongodb with jwt token and user.id and populate user collection
                        const session: ISession | null  = await Session.findOne({ expiryDate: { $gt: new Date()},
                            token,
                            user: (payload as any).sub }).populate("user")

                        // If exists, handle it
                        if (session) {
                            // Create auth key in redis
                            config.database.redis.set(`session-${token}`,
                                JSON.stringify(session.user),
                                "EX",
                                session.expiryDate.getTime())

                            // Set user to req.user and return next
                            req.user = session.user
                            return next()
                        } else {
                            throw new ErrorMessage("Unauthorized", "Authentication failed", 401)
                        }
                    }
                } catch (error) {
                    next(error)
                }
            })
        } else {
            throw new ErrorMessage("Unauthorized", "Authentication failed", 401)
        }
    } catch (error) {
        next(error)
    }
}
