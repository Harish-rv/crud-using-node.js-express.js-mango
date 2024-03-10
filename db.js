const mongodb  = require("mongodb");
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectId;
let dataBase;

async function getDataBase(){
    const client = await mongoClient.connect('mongodb://127.0.0.1:27017');
    const dataBase =  client.db('crud');
    
    if(!dataBase){
        console.log('Database Not connected');
    }

    return dataBase;
}

module.exports = {
    getDataBase,
    objectId
} 