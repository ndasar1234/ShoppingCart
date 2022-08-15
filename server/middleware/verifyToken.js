import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
// import "dotenv/config" is this needed?

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token
    if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json("You are not authenticated.")
    }

    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) return res.status(StatusCodes.FORBIDDEN).json("Token is not valid.")
        req.user = user
        next()
    })
}

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            res.status(StatusCodes.FORBIDDEN).json("Not Authorized")
        }
    })
}

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(StatusCodes.FORBIDDEN).json("Not an Admin")
        }
    })
}