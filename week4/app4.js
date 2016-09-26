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

    var meetingsData = JSON.parse(fs.readFileSync("/home/ubuntu/workspace/data/addressArray01.txt"));

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/aaMeeting';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient; // npm install mongodb

    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var collection = db.collection('meetings');

        // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
        for (var i = 0; i < meetingsData.length; i++) {
            collection.insert({
                meetingName: "",
                address: meetingsData[i].address,
                location: meetingsData[i].latLong,
                time: ""
            });
        }
        db.close();
}); //request