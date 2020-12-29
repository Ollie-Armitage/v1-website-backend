const mongodb = require('mongodb');

const dblink =  "mongodb+srv://ollie-0:"
    + process.env.dbpassword
    + "@website-cluster-0.5nllz.azure.mongodb.net/"
    + process.env.dbname
    + "?retryWrites=true&w=majority";

async function loadCollection(collection) {
    const client = await mongodb.MongoClient.connect(dblink, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    if(client){
        console.log("Loaded Collection: " + collection);
    }

    return client.db('Website-Cluster-0').collection(collection);
}

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    adminPassword: process.env.adminpass,
    loadCollection
}
// Need to enter password and dbname into node args.
