const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const models = require('../models')
const {sign} = require("jsonwebtoken");

// get all users
function index(req, res){
    models.User.findAll().then(result =>{
        res.status(200).json({
            message: "User pulled successfully",
            post: result
        })
    }).catch(error =>{
        res.status(500).json({
            message: "cannot get users",
            error: error
        })
    })
}

// get one user
function getUser(req, res){
    const id = req.params.id
    models.User.findByPk(id).then(result =>{
        res.status(200).json({
            message: "user found",
            post: result
        })
    }).catch(error => {
            res.status(500).json({
                message: "something went wrong",
                error: error
            })
        }
    )
}
// sign up and encrypt user
function signup(req, res){{
    models.User.findOne({where: {email: req.body.email}}).then(result =>{
        if(result){
            res.status(409).json({
                message: "user exists",
                post: result
            })
        }else{
            //generate a hashed password and use callback function register a new hashed password
            bcryptjs.genSalt(10, (err, salt)=>{
                bcryptjs.hash(req.body.password, salt, (err, hash)=>{{
                    const user ={
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    }

                    models.User.create(user).then(result =>{
                        res.status(200).json({
                            message: "user created successfully",
                            post: result
                        })
                    }).catch(error =>{
                        res.status(500).json({
                            message: "something went wrong",
                            error: error
                        })
                    })
                }
                })
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message: "something went wrong",
            error: error
        })
    })
}}

function login(req, res){
     models.User.findOne({where:{email: req.body.email}}).then(user =>{
        if(user === null){
            res.status(401).json({
                message: "Invalid user",
            })
        }else{
            // check if the hashed password mtched the input hashed one
            bcryptjs.compare(req.body.password, user.password, (err, result)=>{
                if(result){
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, 'secret', (err, token)=>{
                        res.status(200).json({
                            message: "Auth success",
                            token: token
                        })
                    })
                }else{
                    res.status(401).json({
                        message: "Auth failed",
                    })
                }
            })
        }
     }).catch(error =>{
         res.status(404).json({
             message: "something went wrong",
             error: error
         })
     })
}

module.exports = {
    signup:signup,
    login: login,
    getUser: getUser,
    index: index
}