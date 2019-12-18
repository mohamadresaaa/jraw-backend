import express from "express"

// controllers
import accountController from "../../controllers/v1/authentication/accountController"
// import { accountActivation } from "src/utilities/validatorSchema"

const router = express.Router()

// routes
router.get("/",
    accountController.currentUser.bind(accountController))
router.post("/account/deactivate",
    // validator(accountActiva),
    accountController.deactivation.bind(accountController))

export default router
