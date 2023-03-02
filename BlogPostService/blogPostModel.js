const Mongoose = require('mongoose');

const BlogPostSchema = new Mongoose.Schema({
    title:{type: String},
    username:{type:String,required:true}
})

const  BlogPost= Mongoose.model('BlogPost', BlogPostSchema);
module.exports =  BlogPost;
