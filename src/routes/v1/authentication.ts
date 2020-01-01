import express from "express"
import { login, register } from "../../utilities/validatorSchema"
import { validator } from "./../../middleware/validator"

// controllers
import authenticateController from "../../controllers/v1/authenticateController"

const router = express.Router()

// routes
router.post("/register",
            validator(register),
            authenticateController.registration)

router.post("/login",
            validator(login),
            authenticateController.login)

export default router
