const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["member", "admin"],
        default: "member"
    }
})

UserSchema.pre("save", function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash)=>{
        user.password = hash
        next() //Bir sonraki middleware e ilerlemesi için next metodu yazıldı
    })
})//Önce kullanıcıdan alınan password şifrelendi kaydetmeden önce hash olarak kaydedildi

const User = mongoose.model("User", UserSchema)
module.exports = User