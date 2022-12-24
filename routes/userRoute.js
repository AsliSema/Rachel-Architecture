const express = require("express")
const authController = require("../controllers/authController")
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../models/User")
const { body } = require('express-validator');

const router = express.Router()


router.route("/logout").get(authMiddleware, authController.logoutUser)
router.route("/signin").post(authController.loginUser)
router.route("/signup").post(
    [
        body("name").not().isEmpty().withMessage("Please Enter Your Name! "),
        body("email").isEmail().withMessage("Please Enter Your Valid Email! ")
        .custom(userEmail => {
            return User.findOne({email: userEmail}).then(user => {
              if (user) {
                return Promise.reject('E-mail already in use!');
              }
            });
        }),
        body("password").not().isEmpty().isLength({ min:5 }).withMessage("Please Enter Valid Password!")
    ],
    authController.createUser)
router.route("/askus").get(authMiddleware, authController.getAskUsPage)

module.exports = router