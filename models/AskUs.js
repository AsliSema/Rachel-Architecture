const fileUpload = require("express-fileupload")
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const AskUsSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required:true,
        trim: true  //Başında ve sonunda boşluklar varsa onların kaldırılmasına yarıyor.
    },
    askUsImage:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

const AskUs = mongoose.model("AskUs", AskUsSchema)
module.exports = AskUs