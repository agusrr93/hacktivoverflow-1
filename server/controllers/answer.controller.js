const Answer = require('../models/answer.model')

module.exports = {

    createOne: (req, res) => {
        let newAnswer = {
            answer: req.body.answer,
            question: req.params.question,
            owner: req.decoded._id,
        }
        let answer = new Answer(newAnswer)
        answer.save()
        .then( response => res.status(201).json(response))
        .catch( err => res.status(500).json(err))
    },

    
    putById: (req, res) => {
        Answer.findById({_id:req.params.id, owner: req.decoded._id})
        .then( oldAnswer => {
            let dataAnswer = {
                answer: req.body.answer || oldAnswer.answer,
            }
            console.log(req.body.answer)
            Answer.updateOne({_id: req.params.id}, dataAnswer)
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    },

    deleteById: (req, res) => {
        Answer.findById({_id: req.params.id, owner: req.decoded._id})
        .then(result => {
            let answer = new Answer({_id: result._id})
            answer.remove()
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    },
    
    upvote: (req, res) => {
        let id = req.params.id
        
        Answer.findByIdAndUpdate(id, { $pull: { vote: req.decoded._id }})
        .then( response => {
            Answer.findByIdAndUpdate(id,{$pull: { unvote: req.decoded._id}})
            .then(response=>{
                Answer.findByIdAndUpdate(id,{$push: { vote: req.decoded._id}})
                .then((response)=>{
                    res.status(200).json({
                    err: false,
                    "message": "Success for vote a Question"
                })
                .catch(err=>{
                    res.status(500).json({err:true
                    ,"message":"cannot vote a question"})
                })
            })
            .catch(err=>{
                res.status(500).json({err:true
                ,"message":"cannot vote a question"})
            })        
        })
        .catch(err=>{
            res.status(500).json({err:true
            ,"message":"cannot vote a question"})
        })
    })
    .catch( err => {
        res.status(500).json({
            err: true,
            "message": err.message,
        })
    })  
},

downvote: (req, res) => {
        let id = req.params.id
        
        Answer.findByIdAndUpdate(id, { $pull: { vote: req.decoded._id }})
        .then( response => {
            Answer.findByIdAndUpdate(id,{$pull: { unvote: req.decoded._id}})
            .then(response=>{
                Answer.findByIdAndUpdate(id,{$push: { unvote: req.decoded._id}})
                .then((response)=>{
                    res.status(200).json({
                    err: false,
                    "message": "Success for vote a Question"
                })
                .catch(err=>{
                    res.status(500).json({err:true
                    ,"message":"cannot vote a question"})
                })
            })
            .catch(err=>{
                res.status(500).json({err:true
                ,"message":"cannot vote a question"})
            })        
        })
        .catch(err=>{
            res.status(500).json({err:true
            ,"message":"cannot vote a question"})
        })
    })
    .catch( err => {
            res.status(500).json({
            err: true,
            "message": err.message,
        })
    })  
},
}
