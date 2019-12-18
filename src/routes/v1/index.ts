import express from "express"
import auth from "../../middleware/authorization"
import authenticationRoutes from "./authentication"
import userRoutes from "./user"

const router = express.Router()

// routes
router.use("/auth", authenticationRoutes)
router.use("/user", auth, userRoutes)

module.exports = router
