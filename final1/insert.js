// IN THE MONGO SHELL: 
//   CREATE DATABASE aaMeeting AND SWITCH TO IT WITH: 
//      use aaMeeting
//   CREATE COLLECTION meetings WITH: 
//      db.createCollection('meetings')
//   QUERY THE ENTIRE meetings COLLECTION WITH:
//      db.meetings.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE meetings COLLECTION WITH:
//      db.meetings.find().count()

var fs = require('fs');

var meetingsData = JSON.parse(fs.readFileSync("/home/ubuntu/workspace/final1/manhattanFull.txt"));

var url = 'mongodb://' + process.env.IP + ':27017/aaMeeting';

var MongoClient = require('mongodb').MongoClient; 

MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }

    var collection = db.collection('meetings');

    // THIS IS WHERE THE DOCUMENT(S) WHERE INSERTED TO MONGO:

    collection.insertMany(meetingsData);
    console.log("Inserted " + meetingsData.length + " into the document collection");
    db.close();
    
    });