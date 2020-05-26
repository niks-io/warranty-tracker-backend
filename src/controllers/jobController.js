const Job = require("../models/jobModel");

module.exports = {

    addJob: function(req, res, next){

        let newJob = new Job(req.body);
        newJob.jobOfficer = req.user.mail;

        newJob.save((err, job)=>{

            if (err) {
                next(err)
            } else{
                res.json(job)
            }
        })
    }
}