module.exports = (req, res, next)=>{
    if(req.session.userID && req.session.role == "admin"){
        next()
    } else {
        return res.redirect("/signin")
    }
}  