const express = require('express');
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3014;
const repo    = require('./commentRepos');

const pub = require('./publisher.js')
require('./consumer.js')
const payload = require("../BlogPostService/payload/payloadCreator");

{
    var mongoose = require('mongoose');

//connectie opzetten
    mongoose.connect('mongodb://localhost:27017/Comment');
}


app.use(cors());
app.use(express.json());


//Opdracht 1
app.post('/posts/:blogpostId/:username',async(req,res)=>{
    try{
        let orgValue         = req.body;
        orgValue.blogpostId = req.params.blogpostId;
        orgValue.username = req.params.username;

        // //TODO check iff blogpostId exists
         const messageCreator1 = new payload('get',orgValue.blogpostId,"","");
         let value1            = messageCreator1.getPayload();
         await pub(value1)



        let result          = await repo.putMessage(orgValue);
        res.status(202).send(`Uw comment is geplaatst! Id is: ${result.username}.`);

        const messageCreator = new payload('create',orgValue.username,"","");
        let value            = messageCreator.getPayload();
        await pub(value);

    }catch(err){
        res.status(400).send('Username is niet uniek.');
    }
})


app.patch('/comments/:commentusername',async(req,res)=>{
    try{
        let id     = req.params.commentusername;
        let value  = req.body;
        let result = await repo.update(value,id);
        res.status(200).send(`Bericht is geplaatst : ${result.username} `);
    }catch(err){
        res.status(404).send(err);
    }
})


app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
