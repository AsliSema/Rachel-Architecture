
const AskUs = require("../models/AskUs")
const AnswerAskUs = require("../models/AnswerAskUs") 


exports.createAskUs = async(req, res) => {

    try{
        let uploadedImage = req.files.askUsImage;  //post requestle gönderilen görsele ait bilgiler yakalandı
        let uploadPath = __dirname + "/../public/uploads/" + uploadedImage.name; 
        uploadedImage.mv(uploadPath, async()=>{
            const askUs = await AskUs.create({
                ...req.body,
                askUsImage: "/uploads/" + uploadedImage.name
            })
            res.status(201).redirect("/comingFromYou")     
        })} catch(error) {
            res.status(400).json({
                status: "fail",
                error
            })
        }
    }

exports.getAllAskUs = async(req, res) => {
    try{
     const showAskUs = await AskUs.find().sort("-createdAt")
    
    for (let i=0; i<showAskUs.length ; i++) {
        showAskUs[i].answers = await AnswerAskUs.find({ askUs_id: showAskUs[i].id })
    }
        res.status(200).render("comingFromYou", {
            showAskUs
        })
    } catch(error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
            error
        })
    }
}