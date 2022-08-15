import express from "express"
const router = express.Router()
import { StatusCodes } from "http-status-codes"
import CryptoJS from "crypto-js"
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js"

import User from "../models/User.js"

// Update User (user)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTOJS_SECRET).toString()
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(StatusCodes.OK).json(updatedUser)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Delete User (user)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json("User has been deleted.")
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get User (admin)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // separating password so it isn't sent in the response to the user
        const { password, ...others } = user._doc
        res.status(StatusCodes.OK).json(others)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get All Users (admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query
            ? await User.find().sort({ _id: "descending" }).limit(5)
            : await User.find()
        // separating password so it isn't sent in the response to the user
        // const { password, ...others } = user._doc

        res.status(StatusCodes.OK).json(users)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get User Stats (admin)
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear() - 1)

    try {
        // getting all users within the last year
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },  // all users have createdAt property
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }  // 1 sums every registered user
                }
            }
        ])
        res.status(StatusCodes.OK).json(data)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})


export default router