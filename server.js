const express = require('express')
const cors = require('cors')
const {checkSchema} = require('express-validator')

const app = express()
const port = 3055
const configureDB = require('./app/config/db')
const userCltr = require('./app/controllers/user-controller')

const {userRegistrationSchema, userLoginSchema} = require('./app/validators/user-validation-schema')
const {authenticateUser, authorizeUser} = require('./app/middleware/auth')
configureDB()

app.use(express.json())
app.use(cors())




app.post('/api/user-register',checkSchema(userRegistrationSchema),userCltr.register)
app.post('/api/user-login',checkSchema(userLoginSchema),userCltr.login)
app.get('/api/user-account', authenticateUser,userCltr.account)

app.post('/api/jobs' ,authenticateUser,  authorizeUser(['recruiter']),(req, res) =>{
    res.send('api to create the job posting')
})










app.listen(port, ()=>{
    console.log('server running on port',port);
})