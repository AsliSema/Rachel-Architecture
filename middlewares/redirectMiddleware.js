module.exports = (req, res, next)=>{
    if(req.session.userID){
        return res.redirect("/")
    }
    next()
}  //Giriş yapan kullanıcıların signin ve signup sayfalarına erişmesini engellemek ve ana sayfaya yönlendirmek için yazıldı.