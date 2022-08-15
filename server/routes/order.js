import express from "express"
const router = express.Router()
import { StatusCodes } from "http-status-codes"
import { verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization } from "../middleware/verifyToken.js"

import Order from "../models/Order.js"

// NOTE: id represents order Id, userId represents that user's Id to get all their products

// Create Order (user)
router.post("/", verifyToken, async (req, res) => {
    try {
        const newOrder = await Order.create(req.body)
        res.status(StatusCodes.OK).json(newOrder)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Update Order (admin)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(StatusCodes.OK).json(updatedOrder)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Delete Order (admin)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json("Order has been deleted.")
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get User Orders (user)  note: a user can have more than one order
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(StatusCodes.OK).json(orders)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get All Orders (admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(StatusCodes.OK).json(orders)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get Monthly Income (admin)
router.get("/income", verifyTokenAndAdmin, async (req, res) => {
    const productId = req.query.productId
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const previousMonth = new Date(lastMonth.setMonth(lastMonth.getMonth() - 1))

    try {
        const income = await Order.aggregate([
            {
                $match: {
                    createdAt: { $gte: previousMonth },
                    ...(productId && {
                        products: { $elemMatch: { productId } },
                    }),
                },
            },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" },
                }
            }
        ])
        res.status(StatusCodes.OK).json(income)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})



export default router