const User = require('../models/user.model')
const hash = require('bycjwt')
const axios= require('axios')
module.exports      = {

    signup: (req, res) => {
        let objUser = {
            name    : req.body.name,
            email   : req.body.email,
            password: req.body.password
        }
        User.create(objUser)
        .then( response => res.status(201).json(response))
        .catch( err => {
            res.status(500).json(err)
        })
    },

    signin : (req, res) => {
        let email           = req.body.email
        let password        = req.body.password

        User.findOne({email: email})
        .then( user => {
            if(hash.bcdecode(password, user.password)) { 
                res.status(200).json({
                    err:false,
                    name: user.name,
                    token:hash.jwtencode({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })
                })
            } else {
                res.status(400).json({message:"Password is wrong"})
            }
        })
        .catch(err => {
            res.status(500).json({err:true})
        })
    },

    getOne: (req, res) => {
        User.findById({_id: req.decoded._id})
        .then( response => {
            let user = {
                name: response.name,
                _id: response._id,
                email: response.email,
                questions: response.questions,
                role: response.role
            }
            res.status(200).json(user)
        })
        .catch( err => res.status(500).json(err))
    }, 

    getAll: (req, res) => {
        User.find({}, function(err, result){
            if(!err) {
                res.status(200).json(result)
            }
        })
    },
    login:(req,res)=>{
        
        let token=req.body.token
        console.log(token)
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client("893372285736-qin6akg5sje8m7n93lsacm19q2j5jleg.apps.googleusercontent.com");

        async function verify() {
          const ticket = await client.verifyIdToken({
              idToken: token,
              audience: "893372285736-qin6akg5sje8m7n93lsacm19q2j5jleg.apps.googleusercontent.com",
          });
          const payload = ticket.getPayload();
          const userid = payload['sub'];
         
          let dataRespon = null
    
          axios({
            method:'GET',
            url:`https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=${token}`
          })
          .then((response) => {
            
            dataRespon = response

            return User.findOne(
                { 
                    email: response.data.email
                })
            })
          .then((user) => {
              
             if(user !== null){
                let mypassword = dataRespon.data.family_name + "123"
                
                if (hash.bcdecode(mypassword, user.password)) {
                    res.status(200).json({
                        err:false,
                        name: user.name,
                        token:hash.jwtencode({
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role
                        })
                    }) 
              }} 
              else {
              
              let dataUser = new User({
                name: dataRespon.data.name,
                email: dataRespon.data.email,
                password: dataRespon.data.family_name + "123",
              })      
              
              console.log(dataUser)
              dataUser.save()
              .then((user) => {
                res.status(200).json({
                    err:false,
                    name: user.name,
                    token:hash.jwtencode({
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    })
                }) })
            .catch((err) => {
                res.status(500).json({
                  err,
                  message: `login with google failed`
                })
              });
    
            }
          })
          .catch((err) => {
            
          });
    
        }
        verify().catch(console.error)
    }
}
