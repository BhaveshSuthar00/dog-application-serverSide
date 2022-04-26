const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
    petImg : {type : String, required : true},
    petWeight : {type : Number, required : true},
    type : {type : String, required : true}
}, {
    versionKey : false
})
const Pet = mongoose.model('pet', petSchema)
module.exports = Pet;