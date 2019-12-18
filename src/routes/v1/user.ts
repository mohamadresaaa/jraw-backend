import express from "express"

// controllers
import accountController from "../../controllers/v1/authentication/accountController"

// middleware
import passwordController from "../../controllers/v1/authentication/passwordController"
import { changePassword, checkCode } from "../../utilities/validatorSchema"
import { validator } from "./../../middleware/validator"

const router = express.Router()

// routes
router.get("/",
    accountController.currentUser.bind(accountController))

router.post("/deactivateAccount",
    validator(checkCode),
    accountController.deactivation.bind(accountController))

router.post("/changePassword",
    validator(changePassword),
    passwordController.change.bind(passwordController))

export default router
