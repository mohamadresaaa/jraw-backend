import express from "express"

// controllers
import accountController from "../../controllers/v1/authentication/accountController"

// middleware
import { checkCode } from "../../utilities/validatorSchema"
import { validator } from "./../../middleware/validator"

const router = express.Router()

// routes
router.get("/",
    accountController.currentUser.bind(accountController))
router.post("/account/deactivate",
    validator(checkCode),
    accountController.deactivation.bind(accountController))

export default router
