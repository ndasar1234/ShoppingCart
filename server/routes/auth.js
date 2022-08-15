import express from "express"
const router = express.Router()
import { StatusCodes } from "http-status-codes"
import CryptoJS from "crypto-js"
import jwt from "jsonwebtoken"

import User from "../models/User.js"

// Register
router.post("/register", async (req, res) => {
    const { username, email, isAdmin } = req.body

    try {
        const newUser = await User.create({
            username,
            email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString(),
            isAdmin
        })

        const accessToken = jwt.sign({
            id: newUser._id,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "3h" })

        // separating password so it isn't sent in the response to the user
        const { password, ...others } = newUser._doc

        res.status(StatusCodes.CREATED).json({ ...others, accessToken })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Login
router.post("/login", async (req, res) => {
    const { username } = req.body

    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist." })
        }

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.CRYPTOJS_SECRET).toString(CryptoJS.enc.Utf8)
        if (req.body.password !== hashedPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid password" })
        }

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET, { expiresIn: "3h" })

        // separating password so it isn't sent in the response to the user
        const { password, ...others } = user._doc

        res.status(StatusCodes.OK).json({ ...others, accessToken })
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})


export default router