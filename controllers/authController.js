const User = require("../models/User")

const bcrypt = require("bcrypt")
const { validationResult } = require('express-validator')


exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        req.flash("success", "You Have Succesfully Registered")
        res.status(201).redirect("/signin")
    } catch (error) {
        const errors = validationResult(req)
        console.log(errors)
        console.log(errors.array()[0].msg)

        for(let i=0; i<errors.array().length; i++) {
            req.flash("error", `${errors.array()[i].msg}`)
        }
        res.status(400).redirect("/signup")
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })
    if (user) {
        const checkPassword = await bcrypt.compare(password, user.password, (err, same)=>{
            if(same) {
            req.session.userID = user._id //session a userID şeklinde veri eklendi.
            req.session.role = user.role 
            res.status(200).redirect("/askus")
            } else {
                req.flash("error", "Your Password Is Not Correct!")
                res.status(400).redirect("/signin")
            }
        })
        //bcrypt paketinin compare fonksiyonu kullanıldı. Body tarafından girilen passwordle veri tabanındaki password karşılaştırıldı.
    }
    else {
        req.flash("error", "User Is Not Exist!")
        res.status(400).redirect("/signin")
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
    })
}

exports.getAskUsPage = async (req, res) => {
    const user = await User.findOne({ _id: req.session.userID })
    res.render("askus", {
        user //kullanıcı askus sayfasına gönderildi
    })
}
