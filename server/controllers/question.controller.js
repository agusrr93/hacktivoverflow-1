const Question = require('../models/question.model')

module.exports = {

    createOne: (req, res) => {
    
        sendArticle(req.body)
        let newQuestion = {
            title: req.body.title,
            description: req.body.description,
            owner: req.decoded._id,
            category: req.body.category
        }
        let question = new Question(newQuestion)
        question.save()
        .then( response => res.status(201).json(response))
        .catch( err => res.status(500).json(err))
    },

    getAll: (req, res) => {
        Question.find({})
        .sort([['updatedAt', 'descending']])
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'answers',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    getAllPop: (req, res) => {
        Question.find({})
        .sort([['answers', 'descending']])
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'answers',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    getAllMine: (req, res) => {
        Question.find({owner: req.decoded._id})
        .sort([['updatedAt', 'descending']])
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'answers',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    searchQuestionByTitle: (req, res) => {
		Question.find({title: { $regex: req.params.search, $options: 'i' } })
		.populate('owner')
        .populate('category')
        .populate({ 
            path: 'answers',
            populate: {path: 'owner'} 
         })
		.then((response) => res.status(200).json(response))
        .catch((err) => res.status(500).json(err))
	},

    getById: (req, res) => {
        Question.findById({_id: req.params.id})
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'answers',
            populate: {path: 'owner'} 
         })
        .then( response => res.status(200).json(response))
        .catch( err => res.status(500).json(err))
    },

    putById: (req, res) => {
        Question.findById({_id:req.params.id, owner: req.decoded._id})
        .populate('owner')
        .populate('category')
        .populate({ 
            path: 'answers',
            populate: {path: 'owner'} 
         })
        .then( oldQuestion => {
            let dataQuestion = {
                title: req.body.title || oldQuestion.title,
                description: req.body.description || oldQuestion.description,
            }
            Question.updateOne({_id: req.params.id}, dataQuestion)
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    },

    deleteById: (req, res) => {
        Question.findById({_id:req.params.id, owner: req.decoded._id})
        .then(result => {
            let Question = new Question({_id: result._id})
            Question.remove()
            .then( response => res.status(200).json(response))
            .catch( err => res.status(500).json(err))
        })
        .catch( err => res.status(500).json(err))
    },

    upvote: (req, res) => {
            let id = req.params.id
            
            Question.findByIdAndUpdate(id, { $pull: { vote: req.decoded._id }})
            .then( response => {
                Question.findByIdAndUpdate(id,{$pull: { unvote: req.decoded._id}})
                .then(response=>{
                    Question.findByIdAndUpdate(id,{$push: { vote: req.decoded._id}})
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
            
            Question.findByIdAndUpdate(id, { $pull: { vote: req.decoded._id }})
            .then( response => {
                Question.findByIdAndUpdate(id,{$pull: { unvote: req.decoded._id}})
                .then(response=>{
                    Question.findByIdAndUpdate(id,{$push: { unvote: req.decoded._id}})
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