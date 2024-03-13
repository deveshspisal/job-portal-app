const mongoose = require('mongoose');

const {Schema, model} = mongoose

const jobSchema = new Schema({
    title : String,
    description : String,
    skills : [String],
    salary : {min : String, max: String},
    recruitedBy : Schema.Types.ObjectId,
    deadline : Date
},{timestamps : true})

const Job = model('Job', jobSchema)

module.exports = Job