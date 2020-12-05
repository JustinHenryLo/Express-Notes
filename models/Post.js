const mongoose = require("mongoose");
//create schema
const PostSchema = mongoose.Schema({
    //title: String,
    //if there are more properties for title like mandatory, data validation etc.. refer below
    title:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Posts', PostSchema);