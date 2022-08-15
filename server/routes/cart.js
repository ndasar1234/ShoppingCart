import express from "express"
const router = express.Router()
import { StatusCodes } from "http-status-codes"
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js"

import Cart from "../models/Cart.js"

// NOTE: id represents order Id, userId represents that user's Id to get all their products

// Create Cart (user)
router.post("/", verifyToken, async (req, res) => {
    try {
        const newCart = await Cart.create(req.body)
        res.status(StatusCodes.OK).json(newCart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Update Cart (user)
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(StatusCodes.OK).json(updatedCart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Delete Cart (user)
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json("Cart has been deleted.")
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get User Cart (user)
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId })
        res.status(StatusCodes.OK).json(cart)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get All Carts (admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find()
        res.status(StatusCodes.OK).json(carts)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})


export default router