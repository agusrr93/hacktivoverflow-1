const axios = require('axios')
const hash = require('bycjwt')
const User = require('../models/user.model')

module.exports = {
    facebook: (req, res) => {
        let url = `https://graph.facebook.com/me?fields=id,name,email,birthday&access_token=${req.body.accessToken}`
        axios({
            url: url,
            method: 'GET'
        })
        .then( response => {
            User
                .findOne({email:response.data.email})
                .then( result => {
                    if(!result) {
                        let fb = {
                            name: response.data.name,
                            email: response.data.email,
                            password: response.data.id
                        }
                        let user = new User(fb)
                        user.save()
                        .then(newUser => {    
                            res.status(201).json({
                                err:false,
                                message: `Success to add ${newUser.name}`,
                                data: newUser,
                                token:hash.jwtencode({
                                    id: newUser._id,
                                    name: newUser.name,
                                    email: newUser.email
                                })
                            })
                        })
                    } else {
                        console.log(result)
                        let token = hash.jwtencode({
                            _id: result._id,
                            name: result.name,
                            email: result.email,
                            role: result.role
                        })
                        res.status(200).json({token: token, name: result.name})
                    }
                })
                .catch( err => {
                    console.log(err);
                })
        })
        .catch( err => {
            console.log(err)
            res.status(500).json(err.message)
        })
    }
}