const Mongoose = require('mongoose');

const commentSchema = new Mongoose.Schema({
    title:{type: String},
    blogpostId:{type: String, required:true},
    username:{type:String, required:true,default: 'noValue'}
})


module.exports = Mongoose.model('BlogComment',commentSchema);
