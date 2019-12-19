import express from "express"
import accountRoutes from "./account"
import sessionRoutes from "./session"

const router = express.Router()

// routes
router.use("/account", accountRoutes)
router.use("/sessions", sessionRoutes)

export default router
