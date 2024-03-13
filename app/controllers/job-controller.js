const Job = require('../models/job-model');
const {validationResult} = require('express-validator')


const jobCltr = {}

jobCltr.create = async (req, res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json(errors)
    }else{
        
        try{
            const {body} = req
            const job = new Job(body)
            job.recruitedBy = req.currentUser.id
            job.save()
            res.json(job)
        }catch(err){
            res.json(err)
        }
    }

}

module.exports = jobCltr