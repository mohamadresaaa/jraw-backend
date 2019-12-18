import express from "express"

// controllers
import accountController from "../../controllers/v1/authentication/accountController"

const router = express.Router()

// routes
router.get("/",
    accountController.currentUser.bind(accountController))

export default router
