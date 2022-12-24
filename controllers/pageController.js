const nodemailer = require("nodemailer")
const Message = require("../models/Message")

exports.getIndexPage = function (req, res) {
    res.render("index")
}
exports.getAboutPage = (req, res) => {
    res.render("about")
}

exports.getComingFromYouPage = (req, res)=>{
    res.render("comingFromYou")
}
exports.getOurDesignPage = (req, res)=>{
    res.render("ourDesign")
}
exports.getSignInPage = (req, res) => {
    res.render("signin")
}

exports.getSignUpPage = (req, res) => {
    res.render("signup")
} 

exports.getContactPage = (req, res) => {
    res.render("contact")
}

exports.sendEmail = async(req, res) => {
    
    try{
        const message =  await Message.create(req.body) 

        const outputMessage = `
        <h1> Mail Details </h1>
        <ul>
            <li>Name: ${req.body.fullname}</li>
            <li>Email: ${req.body.email}</li>
        </ul>
        <h1>Message</h1>
        <p>${req.body.message}</p>
        `
    
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: "**************", // gmail account
              pass: "**************", // gmail password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: '"Rachel  Mimarlık" <****************>', // sender address
            to: "***************", // list of receivers
            subject: "Rachel Mimarlık Form New Message", // Subject line
            text: "Hello world?", // plain text body
            html: outputMessage, // html body
          });
        
          console.log("Message sent: %s", info.messageId);
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    
          req.flash("success", "We Recieved Your Message Succesfully!")
    
          res.status(200).redirect("/contact")
    } catch (err){
        req.flash("error", "Something Happen!")
        res.status(200).redirect("/contact")
    }

    
}