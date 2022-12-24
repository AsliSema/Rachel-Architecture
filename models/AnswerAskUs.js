const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AnswerAskUsShema = new Schema({
    answer: String,
    askUs_id: {
        type: mongoose.Types.ObjectId,
        ref: "AskUs"
    } //deneme 29.10 30.10
})

const AnswerAskUs = mongoose.model("AnswerAskUs", AnswerAskUsShema)
module.exports = AnswerAskUs