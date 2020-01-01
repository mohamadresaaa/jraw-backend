import express from "express"

// controllers
import accountController from "../../../controllers/v1/user/accountController"
import passwordController from "../../../controllers/v1/user/passwordController"

// middleware
import { changePassword, checkCode, checkUsername } from "../../../utilities/validatorSchema"
import { validator } from "./../../../middleware/validator"

const router = express.Router()

// routes
router.get("/",
    accountController.currentUser)

router.post("/deactivate",
    validator(checkCode),
    accountController.deactivation)

router.post("/changePassword",
    validator(changePassword),
    passwordController.update)

// router.post("/changeUsername",
//     validator(checkUsername),
//     accountController.updateUsername)

export default router
