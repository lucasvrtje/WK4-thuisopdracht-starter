const Blogpost = require('./blogPostModel');


class BlogPost{
    putMessage(value){ return new Promise((resolve,reject)=>{
        const blogPost = new Blogpost(value)
        blogPost.save()
            .then(savedValue =>{

                if(savedValue){
                    resolve(savedValue)
                    return;
                }
            }).catch(e =>{
                console.log("saving error")
            reject(e);
        })
    })
    }
    async get(value){
        try{
            let filter = {username:value};
           console.log( `filter = ${filter}`)

            let result = await Blogpost.findOne(filter);
            console.log( `result = ${result}`)

            if (result==null){throw 'Het bericht is niet geplaatst!'}
        }catch(e){
            throw `Throwed in update: ${e}`;
        }


    }
    delete(value){return new Promise((resolve,reject)=>{
        Blogpost.deleteMany({username:value})
            .then(()=>{
                resolve("gelukt in de blogPost");
            }).catch((e)=>{
            reject(`weer niet gelukt: ${e}`);
        })
    })
    }
}

module.exports = new BlogPost();
