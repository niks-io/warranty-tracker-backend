const Status = require("../models/statusModel");

module.exports = {

    addStatus: function(req, res, next){

        let newStatus = new Status(req.body);
        newStatus.user = req.user.mail;

        newStatus.save((err, job)=>{

            if (err) {
                next(err)
            } else{
                res.json(job)
            }
        })
    },

    getStatus: function(req, res, next){

        Status.find({jobNo:req.params.jobNo}, (err, status)=>{

            if(err){
                next(err)
            }else{
                res.json(status)
            }
        })
    }
}