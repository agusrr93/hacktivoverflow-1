const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({ 
    name: String,
    questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    deleteAt: { type: Date, default: null},    
}, { timestamps:true });

const Category = mongoose.model('Category', categorySchema);
module.exports = Category

