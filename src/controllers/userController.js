const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = {
    register: function(req, res){

        User.findOne({mail:req.body.mail}, (err, user) => {

            if (err) next(err);

            if(user){
                res.status(409).json({
                    status: "failed",
                    message: "User already exists!"
                });
                return; 
            };
        
        const newUser = new User(req.body);
        newUser.password = bcrypt.hashSync(req.body.password, 10);
        newUser.save((err, user)=>{
                if (err){
                    return res.status(400).send({
                        message:err
                    });
                }else{
                    user.password = undefined;
                    return res.json(user);
                }
            })
        });
    },

    login:function(req, res){
        User.findOne({
            mail:req.body.mail
        }, (err, user)=>{
            if (err) throw err;
            if (!user){
                res.status(401).json({
                    status: "error",
                    message: 'Authentication failed. No user found!'
                });
            }else if(user){
                if(!user.comparePassword(req.body.password, user.password)){
                    res.status(401).json({
                        status: "error",
                        message: 'Authentication failed. Wrong password!'
                    });
            }else{
                return res.status(200).json({
                    status: "success",
                    message: 'User found',
                    data: {token: jwt.sign({mail:user.mail, role:user.role}, process.env.JWT_SECRET), user:user}
                })
            }
        }
        })
    },

    loginRequired:function(req, res, next){
        if(req.user){
            next();
        }else{
            return res.status(401).json({message:"Unauthorized user!"});
        }
    },

    adminRequired:function(req, res, next){
        if(req.user && req.user.role == "admin"){
            next();
        }else{
            return res.status(401).json({message:"Unauthorized user!"});
        }
    }
}