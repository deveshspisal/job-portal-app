const mongoose = require('mongoose')

const configureDB = async () =>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/job-portal')
        console.log('connected to DB');

    }catch(err){
        console.log(err);
    }
}

module.exports = configureDB