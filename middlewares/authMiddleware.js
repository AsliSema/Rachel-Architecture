const User = require("../models/User")

module.exports = (req, res, next)=>{
    User.findById(req.session.userID, (err, user)=>{ //yanlışsa hata dönücek doğruysa user'ın kendisini dönücek
        if(err || !user){  //hata varsa ya da öyle bir kullanıcı yoksa yani giriş yapmamışsa
            return res.redirect("/signin");
        }
        next()
    })
}