const mongoose = require('mongoose')
const Category = require('./category.model')
const User = require('./user.model')
const Schema = mongoose.Schema

const questionSchema = new Schema({ 
    title: String,
    description: String,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    vote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    unvote: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }],
    deleteAt: { type: Date, default: null},    
}, { timestamps:true })

questionSchema.pre('save', function(next) {
    let user = User.updateOne(
        {$push: {questions: this._id}}
    )
    let category = Category.updateOne(
        {_id: this.category}, 
        {$push: {questions: this._id}}
    )

    Promise.all([user, category])
    .then(response => {
        next()
    })
    .catch(err => console.log(err))
})

questionSchema.pre('remove', function(next) {
    let user = User.updateOne(
        {$pull: {questions: this._id}}
    )
    let category = Category.updateOne(
        {_id: this.category}, 
        {$pull: {questions: this._id}}
    )

    Promise.all([user, category])
    .then(response => {
        next()
    })
    .catch(err => console.log(err))
})

const Question = mongoose.model('Question', questionSchema)
module.exports = Question

