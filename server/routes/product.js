import express from "express"
const router = express.Router()
import { StatusCodes } from "http-status-codes"
import { verifyTokenAndAdmin } from "../middleware/verifyToken.js"

import Product from "../models/Product.js"

// Create Product (admin)
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(StatusCodes.OK).json(newProduct)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Update Product (admin)
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(StatusCodes.OK).json(updatedProduct)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Delete Product (admin)
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(StatusCodes.OK).json("Product has been deleted.")
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get Product (anyone)
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(StatusCodes.OK).json(product)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

// Get All Products (anyone)
router.get("/", async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products;

        if (qNew) {
            products = await Product.find().sort({ createdAt: "descending" }).limit(5)
        }
        else if (qCategory) {
            products = await Product.find({
                categories: {
                    $in: [qCategory],
                }
            })
        }
        else {
            products = await Product.find()
        }
        res.status(StatusCodes.OK).json(products)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})


export default router