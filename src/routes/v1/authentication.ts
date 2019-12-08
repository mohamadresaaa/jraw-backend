import express from "express"

const router = express.Router()

// routes
router.post("/register", (req, res, next) => res.json("register"))
router.post("/accountActivation", (req, res, next) => res.json("accountActivation"))
router.post("/login", (req, res, next) => res.json("login"))
router.post("/forgotPassword", (req, res, next) => res.json("forgotPassword"))
router.post("/resetPassword", (req, res, next) => res.json("resetPassword"))

export default router
