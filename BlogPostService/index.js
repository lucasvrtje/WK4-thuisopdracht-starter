const express = require('express');
const app = express();
const cors = require("cors");  //ga eens na waarom deze module wordt gebruikt
const port = process.env.PORT || 3015;
const pub = require('./publisher.js')
const repo = require('./blogPostRepos');
const payload = require('./payload/payloadCreator');


require('./consumer.js') //For starting consumer

app.use(cors());
app.use(express.json());
{
    var mongoose = require('mongoose');

//connectie opzetten
    mongoose.connect('mongodb://localhost:27017/Blogpost');
}



//Opdracht 1
app.post('/posts/:username',async(req,res)=>{
    try{
        let orgValue         = req.body;
        orgValue.username = req.params.username;
         let result          = await repo.putMessage(orgValue);
         res.status(202).send(`Uw bericht is geplaatst! Id is: ${result.username}.`);
        //
         const messageCreator = new payload('create',orgValue.username,"","");
         let value            = messageCreator.getPayload();

         await pub(value); //Dit is bijv. nodig om te voorkomen dat een zelf verzonnen
        //                   //blogpostusername een commentaar kan plaatsen.
        //                   //Hier wordt de username ook opgeslagen in de comment service.

    }catch(err){
        res.status(400).send('Username is niet uniek.');
    }
})






app.delete('/posts/:id',async(req,res)=> {
    try{
        //opslaan in db en wanneer dit lukt kun je doorgaan met bijv. het
        //geven van een respons bijv. 202 Accepted en de message op de event broker plaatsen.
        //in het andere geval: raise an exception!
        //in both cases return a response
        res.send("value");
        await pub("value");

    }catch(err){
        // melding teruggeven
    }




})
// app.get('/ophalen',async(req, res,next) => {
//     try{
//         await pub('naam ophalen');
//         res.send('verzonden via Blog Service naar Comment Service en terug : '+msg.toString());
//     }catch(err){
//         res.send('uit Blog Service : ' +err);
//     }
// })

// async function consume2(){

//         const connection = await rabbitConnection;
//         if(channel === undefined){
//            channel = await connection.createChannel();
//         }
//         const qok = await channel.assertQueue("reply",{ exclusive: false});
//         const bindQueue = await channel.bindQueue("reply","PubSubDemo","message.for.post_and_reply");
//         await channel.consume("reply", message =>{
//             console.log("Wacht op messages...");
//             console.log(`Consumed message in Postblog service in the index.js : ${message.content.toString()}`);
//             msg = message.content.toString();
//             channel.ackAll();
//         });

//     }


// consume2();

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
