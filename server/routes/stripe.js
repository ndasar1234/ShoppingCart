import express from "express"
const router = express.Router()
// import 'dotenv/config'  is this needed?
import { StatusCodes } from "http-status-codes"
import Stripe from 'stripe'
const KEY = process.env.STRIPE_KEY
const stripe = new Stripe(KEY)


router.post("/payment", (req, res) => {
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd"
    }, (stripeErr, stripeRes) => {
        if (stripeErr) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(stripeErr)
        }
        else {
            res.status(StatusCodes.OK).json(stripeRes)
        }
    })
})



export default router