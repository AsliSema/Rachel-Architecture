const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const MongoStore = require('connect-mongo') //Sunucu tekrar başlatıldığında ilgili oturumu kaybetmemek için indirildi.
const fileUpload = require('express-fileupload')
const ejs = require("ejs")
const app = express()
const flash = require('connect-flash')


mongoose.connect('mongodb://localhost/rachel-db')

global.userIN = null

app.use(session({
    secret: 'my_sweet_project',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/rachel-db' })
}))
app.use(flash())
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash()
  next()
})


//Middlewares
app.use(express.static("public"))
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended: true })) //body den gelen verileri yakalamak için (req.body) kullanılan middleware lerden biri)
app.use(express.json()) //body den gelen verileri yakalamak için (req.body) kullanılan middleware'lerden biri)
app.use(fileUpload())


//Burdaydı sessions


//Routes
app.use("*", (req, res, next) => { //"*" 'ın anlamı hangi istek gelirse gelsin
    userIN = req.session.userID
    next()
})   //işlem yapıldıktan sonra diğer middleware gidebilmesini sağlamak için next yazıldı. dğerlerinin ihtiyacı yok çünkü bir şekilde (res.send, redirect ...) middleware sonlandırılıyor.

const pageRoute = require("./routes/pageRoute")
const userRoute = require("./routes/userRoute")
const askusRoute = require("./routes/askusRoute")
const answerRoute = require("./routes/answerRoute")




app.get('/', pageRoute)
app.get('/about', pageRoute)
app.get('/contact', pageRoute)
app.post('/contact', pageRoute)
app.get("/ourDesign", pageRoute)
app.get("/signin", pageRoute)
app.get("/signup", pageRoute)

app.post("/comingFromYou", askusRoute)
app.get("/comingFromYou", askusRoute)

app.post("/signup", userRoute)
app.post("/signin", userRoute)
app.get("/logout", userRoute)
app.get("/askus", userRoute)

app.post("/answerAskUs", answerRoute)
app.get("/answerAskUs", answerRoute)

const port = 3000

app.listen(port, () => {
    console.log(`Sunucu ${port} portunda başlatıldı...`)
})