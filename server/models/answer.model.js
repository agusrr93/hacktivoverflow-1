const mongoose = require('mongoose')
const Question = require('./question.model')
const Schema = mongoose.Schema

const answerSchema = new Schema({ 
    answer: String,
    question: { type: Schema.Types.ObjectId, ref: 'Question' },
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    vote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    unvote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    deleteAt: { type: Date, default: null},    
}, { timestamps:true })

answerSchema.pre('save', function(next) {
    Question.updateOne(
        {_id: this.question}, 
        {$push: {answers: this._id}
    })
    .then( response => {
        next()
    })
    .catch( err => console.log(err))
})

answerSchema.pre('remove', function(next) {
    Question.updateOne(
        {_id: this.question}, 
        {$pull: {answers: this._id}
    })
    .then( response => {
        next()
    })
    .catch( err => console.log(err))
})

const Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer

