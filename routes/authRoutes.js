import express from "express";
import {
  registercontroller,
  loginController,
} from "../controllers/authcontroller.js";
import rateLimit from "express-rate-limit";

//ip limiter

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

//router object

const router = express.Router();

//Routes

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type:Object
 *      required:
 *        -name
 *        -lastName
 *        -email
 *        -password
 *        -location
 *      properties:
 *        id:
 *         type:string
 *         description: The Auto-generated id of user collections
 *        name:
 *         type:string
 *         description: User name
 *        lastName:
 *         type:string
 *         description: User lastName
 *        email:
 *         type:string
 *         description: user email address
 *        password:
 *         type:string
 *         description: user password should be greater than 6 characters
 *        location:
 *         type:string
 *         description: user location city or country
 * 	   example:
 * 		  id:AEROIJSFK
 *        name: john
 *        lastName: doe
 *        email: johndoe@gmail.com
 *        password: test@1234
 *        location: mumbai
 */

/**
 *   @swagger
 *   tags:
 *     name:auth
 *     description:Authentication apis
 */

/**
 *  @swagger
 *  /api/v1/auth/register:
 *    post:
 *  	summary: register new user
 *      tags:[Auth]
 *      requestBody:
 *       required:true
 *      content:
 *        application/json:
 *          schema:
 *            $ref:'#/components/schemas/User'
 *      responses:
 *        200:
 *          description:User created successfully
 *          content:
 *            application/json
 *              schema:
 *                $ref:'#/components/schemas/User'
 *        500:
 *          description:Internal Server Error
 */

//REGISTER || POST
router.post("/register", limiter, registercontroller);

/**
 * @swagger
 * /api/v1/auth/login:
 * post:
 *   summary: login page
 *   tags:[Auth]
 *   requestBody:
 *     required:true
 *     content:
 *       application/json
 *          schema:
 *            $ref:'#/components/schemas/User'
 *    responses:
 *      200:
 *        description:login successful
 *        constent:
 *          application/json
 *            schema:
 *              $ref:'#/components/schemas/User'
 *      500:
 *        description:something went wrong
 */

//LOGIN || POST
router.post("/login", limiter, loginController);

//export
export default router;
