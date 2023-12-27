const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = expressAsyncHandler(async(req, res, next) => {
    try {
            const token = req.cookies.token
            console.log('the cookies', req.cookies)
            if(!token){
                res.status(401)
                throw new Error("not authorized, please login----1")
            }
            // vairfy the token
            // const verified = jwt.verify(token, process.env.JWT_SECRET)
            const verified = jwt.verify(token, '123123')

            // get user id from token 
            const user = await User.findByPk(verified.id , {
                attributes: { exclude: ['Password'] }
            })
            if(!user){
                res.status(401)
                throw new Error("user not found")
            }else{
                req.user = user
                next()
            }


    } catch (error) {
        res.status(401)
        throw new Error("not authorized, please login ---2")
    }
})


module.exports = {
    protect,
    
}