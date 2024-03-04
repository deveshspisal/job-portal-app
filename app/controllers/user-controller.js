const User = require('../models/user-model')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')

const userCltr = {}

userCltr.register = async (req,res) =>{
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json(errors)
        }

        const body = req.body
        const salt = await bcrypt.genSalt()
        const user = new User(body)
        const hashpassword = await bcrypt.hash(user.password, salt)
        user.password = hashpassword
        const savedData = await user.save()
        res.status(201).json(savedData)

    }catch(err){
        console.log(err);
        res.status(500).json('Internal server error')
    }
}


module.exports = userCltr