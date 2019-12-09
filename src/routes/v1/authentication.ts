import express from "express"
import { accountActivation, forgotPassword, login, register, resetPassword } from "../../utilities/validatorSchema"
import { validator } from "./../../middleware/validator"

// controllers
import accountController from "../../controllers/v1/authentication/accountController"
import loginController from "../../controllers/v1/authentication/loginController"
import registerController from "../../controllers/v1/authentication/registerController"

const router = express.Router()

// routes
router.post("/register",
            validator(register),
            registerController.local.bind(registerController))
router.post("/accountActivation",
            validator(accountActivation),
            accountController.activation.bind(accountController))
router.post("/login",
            validator(login),
            loginController.local.bind(loginController))
router.post("/forgotPassword", validator(forgotPassword), (req, res, next) => res.json("forgotPassword"))
router.post("/resetPassword", validator(resetPassword), (req, res, next) => res.json("resetPassword"))

export default router
