import express from "express"
import mongoose from "mongoose";
import 'dotenv/config'
import cors from "cors"

import userRoutes from "./routes/user.js"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import cartRoutes from "./routes/cart.js"
import orderRoutes from "./routes/order.js"
import stripeRoutes from "./routes/stripe.js"


const app = express()

app.use(express.json())
app.use(cors())


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/carts", cartRoutes)
app.use("/api/v1/orders", orderRoutes)
app.use("/api/v1/checkout", stripeRoutes)


app.get("/api/v1/test", (req, res) => {
    res.send("APP IS RUNNING")
})


const port = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
    .then(() => app.listen(port, () => console.log(`Server is listening on port ${port}...`)))
    .catch((error) => console.log(error.message))