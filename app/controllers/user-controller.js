const User = require('../models/user-model')
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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


userCltr.login = async (req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json(errors)
    }

    try{
        const data = await User.findOne({email:req.body.email})
        if(!data){
            res.status(400).json({error : 'Enter correct email or password'})
        }
            
        const hashpassword = data.password
        const userPassword = req.body.password
        const userLoginStatus = await bcrypt.compare(userPassword,hashpassword)
        if(!userLoginStatus){
            res.status(400).json({error : 'Enter correct email or password'})
        }else{
            const tokenData = {
                id : data._id
            }
            const token = jwt.sign(tokenData, 'India@11', {expiresIn: '7d'})
            res.status(201).json({token : token})
        }
        
    }catch(err){
        console.log(err);
        res.status(500).json('Internal Server error')
    }
}

module.exports = userCltr