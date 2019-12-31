import express from "express"
import { checkCode, forgotPassword, login, register, resetPassword } from "../../utilities/validatorSchema"
import { validator } from "./../../middleware/validator"

// controllers
import authenticateController from "../../controllers/v1/authenticateController"
import accountController from "../../controllers/v1/authentication/accountController"

const router = express.Router()

// routes
router.post("/register",
            validator(register),
            authenticateController.registration)
router.post("/activateAccount",
            validator(checkCode),
            accountController.activation)
router.post("/login",
            validator(login),
            authenticateController.login)
router.post("/passwordRecovery",
            validator(forgotPassword),
            authenticateController.passwordRecovery)
router.post("/resetPassword",
            validator(resetPassword),
            authenticateController.resetPassword)

export default router
