import express from "express"

// controllers
import sessionController from "../../../controllers/v1/authentication/sessionController"

const router = express.Router()

// routes
router.get("/",
    sessionController.list)

export default router
