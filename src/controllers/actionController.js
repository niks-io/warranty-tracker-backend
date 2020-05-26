const Action = require("../models/actionModel");

module.exports = {

    addAction: function(req, res, next){

        let newAction = new Action(req.body);

        newAction.save((err,action)=>{

            if (err){
                next(err);
            }else{
                res.json(action);
            }
        });
    },

    getBranches: function(req, res, next){

        Action.find({actionType:'branch'}, (err, branches) => {

            if(err){
                next(err);
            }else{
                res.json(branches);
            }
        })
    }

}