import express from "express"
import { accountActivation, forgotPassword, login, register, resetPassword } from "../../utilities/validatorSchema"
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
            registerController.local.bind(registerController))
router.post("/accountActivation",
            validator(accountActivation),
            accountController.activation.bind(accountController))
router.post("/accountDeactivation",
            validator(accountActivation),
            accountController.deactivation.bind(accountController))
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
