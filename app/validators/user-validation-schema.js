const User = require('../models/user-model')
const userModel = require('../models/user-model')

const userRegistrationSchema = {
    username : {
        notEmpty : {
            errorMessage  : "Username is required"
        },
        trim : true
    },
    email : {
        notEmpty : {
            errorMessage  : "Email is required"
        },
        isEmail : {
            errorMessage  : "Enter a valid email Id"
        },
        custom : {
            options : async (value) => {
                const user = await User.findOne({email : value})
                if(!user){
                    return true
                }else{
                    throw new Error('Email Already exists')
                }
            }
        },
        trim : true,
        normalizeEmail : true
    }, 
    password : {
        notEmpty : {
            errorMessage  : "Password is required"
        },
        isLength : {
            options : {min : 8 , max : 128},
            errorMessage  : "Password should between 8 to 128 characters"
        },
        trim : true
    }
}

module.exports = userRegistrationSchema