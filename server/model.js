const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    task:String,
    done:{
        type:Boolean,
        default:false
    }
})

const todoModel = mongoose.model("todos",Schema)

module.exports = todoModel