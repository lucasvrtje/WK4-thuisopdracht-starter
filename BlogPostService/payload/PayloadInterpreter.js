const repo = require('../blogPostRepos');

class PayloadInterpreter{

    constructor(payload) {
        this.payload = payload;
        this.repo    = repo;
    }

    async interpret(){
        return new Promise(async (resolve,reject) => {
            try{
                await this.#action();
                resolve('interpret message from broker was succesfully processed');
            }catch(e){
                reject('error occurred in service check of interpreter in post service');
            }
        })
    }

    async #action(){
        try {
            if (this.payload.action === "delete") {
                let value = this.payload.value.id
                await this.repo.delete(value);
                return;
            }
            if (this.payload.action === "create") {
            }
            if (this.payload.action === "get") {
                let value = this.payload.body.id
                await  this.repo.get(value);

            }
        }catch(e){
            throw 'Throwed: error occurred in service check of private method #action in post service';
        }
    }
}

module.exports = PayloadInterpreter;
