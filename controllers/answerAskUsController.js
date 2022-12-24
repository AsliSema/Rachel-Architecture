const AnswerAskUs = require("../models/AnswerAskUs")
const AskUs = require("../models/AskUs")



exports.answerAskUs = async (req, res) => {
    try{
        const answerPost = await AnswerAskUs.create({
            answer: req.body.answer,
            askUs_id: req.body.postId, //postId answerAskUs.ejs de input kısmından geliyor.
        })
        res.status(201).redirect("/comingFromYou")
    } catch(error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error
        })
    }
}

exports.showAnswers = async (req, res) => {
    try{
        const showAskUs = await AskUs.find().sort("-createdAt")
        res.status(200).render("answerAskUs", {
            showAskUs
        })
    } catch(error) {
        res.status(400).json({
            status: "fail",
            error
        })
    }
}
