const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    //The below variables name should be same as we passed in our backend
    Username: {type:String, required: true, min: 4, unique: true},
    Password: {type:String, required: true}
})

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel 