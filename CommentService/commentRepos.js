const Comment = require('./commentModel');  //database


class CommentRepos{
    putMessage(value){ return new Promise((resolve,reject)=>{
        console.log(`${JSON.stringify(value)} : in comment repo class`)
        const comment = new Comment(value)
        comment.save()
            .then(savedValue =>{
                console.log(savedValue);
                resolve(savedValue)
            }).catch(e =>{
            console.log('overige error')
            reject('Error in repo.putMessage: ' + e);
        })
    })
    }
    delete(value){return new Promise((resolve,reject)=>{
        Comment.deleteMany({blogpostId:value}).then(()=>{
            resolve("gelukt");
        }).catch((e)=>{
            console.log("niet gelukt");
            reject('niet gelukt');
        })
    })
    }
    async update(value,commentUsername){
        try{
            let filter = {blogpostId:value.blogpostId,username:'noValue'};
            let update = {username:commentUsername,content:value.content};
            let result = await BlogComment.findOneAndUpdate(filter,update,{new : true});
            if (result==null){throw 'Het bericht is niet geplaatst!'}
        }catch(e){
            throw `Throwed in update: ${e}`;
        }


    }
}

module.exports = new CommentRepos();
