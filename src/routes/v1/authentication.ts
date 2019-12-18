import express from "express"
import { checkCode, forgotPassword, login, register, resetPassword } from "../../utilities/validatorSchema"
import { validator } from "./../../middleware/validator"

// controllers
import accountController from "../../controllers/v1/authentication/accountController"
import loginController from "../../controllers/v1/authentication/loginController"
import passwordController from "../../controllers/v1/authentication/passwordController"
import registerController from "../../controllers/v1/authentication/registerController"

const router = express.Router()

// routes
router.post("/register",
            validator(register),
            registerController.handle.bind(registerController))
router.post("/activateAccount",
            validator(checkCode),
            accountController.activation.bind(accountController))
router.post("/login",
            validator(login),
            loginController.local.bind(loginController))
router.post("/forgotPassword",
            validator(forgotPassword),
            passwordController.forgotPassword.bind(passwordController))
router.post("/resetPassword",
            validator(resetPassword),
            passwordController.resetPassword.bind(passwordController))

export default router
