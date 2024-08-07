import express from "express";
import updateUserController, { getUserController } from "../controllers/userController.js";
import userAuth from "../middlewares/authMiddlewares.js";

//router object
const router = express.Router();

//routes

//GET User Data ||Post
router.post('/getUser', userAuth, getUserController);

//Update user ||put
router.put('/update-user', userAuth, updateUserController);

export default router;