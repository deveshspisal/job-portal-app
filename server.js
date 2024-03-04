const express = require('express')
const cors = require('cors')
const {checkSchema} = require('express-validator')

const app = express()
const port = 3055
const configureDB = require('./app/config/db')
const userCltr = require('./app/controllers/user-controller')

const userRegistrationSchema = require('./app/validators/user-validation-schema')

configureDB()

app.use(express.json())
app.use(cors())




app.post('/api/user-register',checkSchema(userRegistrationSchema),userCltr.register)









app.listen(port, ()=>{
    console.log('server running on port',port);
})