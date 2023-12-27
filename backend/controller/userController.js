const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

const generateToken = (id) => {
    return jwt.sign({id}, '123123' , {
        expiresIn: "1d"
    })
}

// register user
const registerUser = asyncHandler(async(req, res) => {
    const {name ,email, password} = req.body;
    console.log('the body is',req.body)
    // validate that request
    if(!name || !email || !password){
        res.status(400)
        throw new Error("Please fill the required fields")
    }
    if(password.length < 6){
        res.status(400);
        throw new Error("password must be greater than 6 characters")
    }
    // check if user exists 
    const userExists = await User.findOne({ where: { email } });
    if(userExists){
        res.status(400)
        throw new Error("Email has already been registered")
    }

    // creater new user
    const user = await User.create({
        name,email, password
    })

    // generate token
    const token = generateToken(user.id)
    // sending token to the frontend
    if(user){
        const {id, name, email} = user
        res.cookie("token", token, {
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            secure: true,
            sameSite: 'None',
        })
        // send user data
        res.status(201).json({
            id, name, email, token
        })
    }else{
        res.status(400)
        throw new Error("Invalid user data")
    }

    res.send("register user...")
})

// login user
const loginUser = asyncHandler( async( req, res ) => {
    const {email, password} = req.body;
    // validate request
    if(!email || !password){
        res.status(400);
        throw new Error("Please add email and password")
    }
    // check if user exists
    const userExists = await User.findOne({ where: { email } });
    if(!userExists){
        res.status(400)
        throw new Error("user does not exists")
    }

    // check if password is correct
    const passwordIsCorrect = await bcrypt.compare(password , userExists.password)
    // generate token
    const token = generateToken(userExists.id);


    if(userExists && passwordIsCorrect){
        const newUser = await User.findOne({ where: { email } },
            {
                attributes: { exclude: ['password'] }
            }
            )
        res.cookie("token" , token, {
            path:"/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400),
            secure: true,
            sameSite: 'None',
        })
        // send data
        res.status(201).json({newUser, token});
        console.log(req.cookies)
         
    } else{
        res.status(400);
        throw new Error("Invalid email or password")
    }

    
})
// logout user
const logoutUser = asyncHandler( async(req, res) => {
    res.cookie("token", "",{
        path:"/",
        httpOnly:true,
        expires:new Date(0),
        secure: true,
        sameSite: 'None',
    })
    res.status(200).json({message: "Successfully logout"})
})


// getuser
const getUser = asyncHandler(async (req, res) => {
    try {
        
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['Password'] }
        });

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
});

// get login status
const getLoginStatus = asyncHandler (async(req, res) => {
    console.log(req.cookies)
    const token = req.cookies.token;
    console.log(req.cookies)
    if(!token){
     return res.json(false)
     // return here so the application stops
     }
         // vairfy the token
         // const verified = jwt.verify(token, process.env.JWT_SECRET)
         const verified = jwt.verify(token, '123123')
      
         if(verified){
             res.json(true)
         }else{
              res.json(false)
         }
 })

 //update user 
 const updateUser = asyncHandler( async(req, res) => {
    const user = await User.findByPk(req.user.id);
    if(user){
        const {name, email, password} = user;
        user.name = req.body.name || name;
        user.email = req.body.email || email;
        user.password = req.body.password || password;
        const updatedUser  = await user.save()
        res.status(200).json(updatedUser)
    }else {
        res.status(404);
        throw new Error("User not found")
    }
    res.send('updated user..')
 })
//  update photo 
  const updatePhoto = asyncHandler(async(req, res) => {
    const {ImageURL} = req.body;
    const user = await User.findByPk(req.user.id);
    user.ImageURL= ImageURL
    const updatedUser = await user.save()
    res.status(200).json(updatedUser)
  })


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto

}