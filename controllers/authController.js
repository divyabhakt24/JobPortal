import use from "express/lib/router/index.js";
import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {

    const { name, lastName, email, password } = req.body
    //validate
    if (!name) {
        next("Please Enter Name")
    }

    if (!lastName) {
        next("Please Enter Last Name")
    }

    if (!email) {
        next("Please Enter Email")
    }

    if (!password) {
        next("Please Enter Password")
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        next("Email already Register Please Login'")
    }
    const user = await userModel.create({ name, lastName, email, password })
    //token
    const token = user.createJWT()

    res.status(201).send({
        success: true,
        message: 'User Created Successfully',
        user: {
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            location: user.location
        },
        token
    });
};

export const loginController = async (req, res, next) => {
    const { email, password } = req.body
    //validate
    if (!email || !password) {
        next('Please Provide All Fields');
    }

    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next('Invalid Username or Password');
    }

    //compare
    const isMAtch = await user.comparePassword(password)
    if (!isMAtch) {
        next('Invalid Username or Password');
    }
    user.password = undefined;

    const token = user.createJWT();
    res.status(200).json({
        success: true,
        message: 'Login Sucessfully',
        user,
        token,
    });
};