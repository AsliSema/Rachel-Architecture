const express = require("express") //Deneme 11:10
const answerAskUsController = require("../controllers/answerAskUsController")
const adminMiddleware = require("../middlewares/adminMiddleware")

const router = express.Router()

router.route("/answerAskUs").post(adminMiddleware, answerAskUsController.answerAskUs)
router.route("/answerAskUs").get(adminMiddleware, answerAskUsController.showAnswers)


module.exports = router