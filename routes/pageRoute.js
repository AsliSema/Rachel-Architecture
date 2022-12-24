const express = require("express")
const pageController = require("../controllers/pageController")
const redirectMiddleware = require("../middlewares/redirectMiddleware")

const router = express.Router()

router.route("/").get(pageController.getIndexPage)
router.route("/about").get(pageController.getAboutPage)
router.route("/contact").get(pageController.getContactPage)
router.route("/contact").post(pageController.sendEmail)
router.route("/ourDesign").get(pageController.getOurDesignPage)
router.route("/signin").get(redirectMiddleware, pageController.getSignInPage)
router.route("/signup").get(redirectMiddleware, pageController.getSignUpPage)


module.exports = router