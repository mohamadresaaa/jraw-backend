import express from "express"
import auth from "../../middleware/authorization"
import { IRequest } from "./../../typings/interface/express"
import authenticationRoutes from "./authentication"

const router = express.Router()

// routes
router.use("/auth", authenticationRoutes)
router.get("/user", auth, (req: IRequest, res, next) => {
    res.json(req.user?.dataTransform())
})

module.exports = router
