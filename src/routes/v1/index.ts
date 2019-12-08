import express from "express"
import authentication from "./authentication"

const router = express.Router()

// routes
router.use("/auth", authentication)

module.exports = router
