class PayloadMessageCreator{

    constructor(action,id,fieldName,dataValue) {
        this.#create(action, id, fieldName, dataValue);
    }

    #create(action, id, fieldName, dataValue){
        this.payloadTestStructure =
            {
                "fromService": "comment",
                "action": action,
                "body": {
                    "id": id,
                    "tableName": fieldName,
                    "dataValue": dataValue
                }
            };
    }

    getPayload(){
        return this.payloadTestStructure;
    }

}

module.exports = PayloadMessageCreator;
