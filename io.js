/* Reading and writing data:
https://mongodb.github.io/node-mongodb-native/3.5/tutorials/crud/

CRUD: Create Read Update Delete

- collection.insertOne({...})
- collection.insertMany([{...}, ])

*/
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const mongoURL = require('./url');

var mongoDB = process.env.MONGODB_URI || mongoURL;



//const collectionName = 'feedback';

function writeItem(data) {
    const client = new MongoClient(mongoURL.url, { useNewUrlParser: true }, { useUnifiedTopology: true });
    client.connect(function(err) {
        // This will create a `cassettes` collection if one doesn't exist. In
        // general, mongo will create a collection if you reference one that
        // doesn't yet exist. Likewise, if you ask for the quantity of a
        // model that doesn't exist, it will just say 0.
        if (err) {
          console.log('Connection error!');
          throw new Error(err);
        }
        const collection = client.db("html_form").collection('feedback');
        if (Array.isArray(data)) {
          collection.insertMany(data);

          
        } else {
          collection.insertOne(data);
        }
        client.close();
    })
}

/* Backend for signUp */

function writeSignup(data) {
  const client = new MongoClient(mongoURL.url, { useNewUrlParser: true }, { useUnifiedTopology: true });
  client.connect(function(err) {
      // This will create a `cassettes` collection if one doesn't exist. In
      // general, mongo will create a collection if you reference one that
      // doesn't yet exist. Likewise, if you ask for the quantity of a
      // model that doesn't exist, it will just say 0.
      if (err) {
        console.log('Connection error!');
        throw new Error(err);
      }
      const collection = client.db("html_form").collection('signup');
      if (Array.isArray(data)) {
        collection.insertMany(data);

        
      } else {
        collection.insertOne(data);
      }
      client.close();
  })
}

/* Read Item trying out */
function readItem(callback) {
  const client = new MongoClient(mongoURL.url, { useNewUrlParser: true },{ useUnifiedTopology: true });
  client.connect(function(err) {
      if (err) {
        console.log('Connection error!');
        throw new Error(err);
      }
      const collection = client.db("html_form").collection('signup');
      return collection.find({}).toArray(callback);
})
}


exports.writeItem = writeItem
exports.writeSignup = writeSignup
exports.readItem = readItem
