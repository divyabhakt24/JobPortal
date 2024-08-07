import express from 'express';
import { loginController, registerController } from '../controllers/authController.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
});
//routes

/**
 * @swagger
 * components:
 * schemas:
 * User:
 *   type:Object
 *    required:
 *     -name
 *     -lastname
 *     -email
 *     -password
 *     -location
 *      properties:
 *        id:
 *          type:string
 *          description:The Auto-generated id of user collection
 *        name:
 *          type:string
 *          description:User name
 *        lastname:
 *          type:string
 *          description:User Last Name
 *         email:
 *          type:string
 *          description:User email
 *          password:
 *          type:string
 *          description:User password should be greater than 6 characters
 *         location:
 *          type:string
 *          description:User location city or country
 *         example:
 *           id:DFERHGFJFEWE
 *           name:Divya
 *           lastname:Bhakt
 *           email:bhakt@gmail.com
 *           password:test@123
 *           location:Nainital
 */


/**
 * @swagger
 * tags:
 *     name:auth
 *     description:authentication apis
 */

/**
 * @swagger
 * /api/vi/auth/register:
 *   post:
 *     summary:register new user
 *     tags:[Auth]
 *     requestBody:
 *      required:true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/User'
 *       responses:
 *        200:
 *          description: user created sucessfully
 *         content:
 *           application/json:
 *           schema:
 *             $ref  :'#/components/schemas/User'
 *        500:
 *          description:internal server error  
 */


// REGSISTER||POST
router.post('/register', limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *   summary: login page
 *   tags: [Auth]
 *   requestBody:
 *    required:true
 *     content:
 *      application/json:
 *       schema:
 *         $ref:'#/componenyts/schemas/User'
 *     responses:
 *       200: 
 *         description:login succesfull
 *         content:
 *           application/json:
 *             schema:
 *              $ref: '#/componenyts/schemas/User'
 *        500:
 *           description:something went wrong
 * 
 */

//Login||post
router.post('/login', limiter, loginController);

export default router;