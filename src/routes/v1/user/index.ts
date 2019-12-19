import express from "express"
import accountRoutes from "./account"

const router = express.Router()

// routes
router.use("/account", accountRoutes)

export default router
