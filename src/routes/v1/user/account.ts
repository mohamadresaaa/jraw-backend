import express from "express"

// controllers
import accountController from "../../../controllers/v1/authentication/accountController"
import passwordController from "../../../controllers/v1/authentication/passwordController"

// middleware
import { changePassword, checkCode, checkUsername } from "../../../utilities/validatorSchema"
import { validator } from "./../../../middleware/validator"

const router = express.Router()

// routes
router.get("/",
    accountController.currentUser.bind(accountController))

router.post("/deactivate",
    validator(checkCode),
    accountController.deactivation.bind(accountController))

router.post("/changePassword",
    validator(changePassword),
    passwordController.update.bind(passwordController))

router.post("/changeUsername",
    validator(checkUsername),
    accountController.updateUsername.bind(accountController))

export default router