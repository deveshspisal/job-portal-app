const jwt = require('jsonwebtoken')

const authenticateUser = async (req, res, next) =>{
    const token = req.headers['authorization']
    if(!token){
        return res.status(400).json({error : 'token is required'})
    }

    try{
        const tokenData = jwt.verify(token, 'India@11')
        req.currentUser = {
            id : tokenData.id,
            role : tokenData.role
        }
        next()
    }catch(err){
        console.log(err);
        return res.status(401).json({error:err.message})
    }
}

const authorizeUser = (permittedRoles) => {

    return (req, res, next) =>{
        if(permittedRoles.includes(req.currentUser.role)){
            next()
        }else{
            res.status(403).json({error : 'you are not authorized to access this url'})
        }
    }
}

module.exports = {
    authenticateUser : authenticateUser,
    authorizeUser : authorizeUser,
}