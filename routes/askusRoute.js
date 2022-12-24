const express = require("express")
const askUsController = require("../controllers/askUsController")

const router = express.Router()

router.route("/comingFromYou").post(askUsController.createAskUs)
router.route("/comingFromYou").get(askUsController.getAllAskUs) 

module.exports = router