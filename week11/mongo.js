var http = require('http');
var fs = require('fs');

// IN THE MONGO SHELL: 
//   CREATE DATABASE aaMeeting AND SWITCH TO IT WITH: 
//      use aaMeeting
//   CREATE COLLECTION meetings WITH: 
//      db.createCollection('meetings')
//   QUERY THE ENTIRE meetings COLLECTION WITH:
//      db.meetings.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE meetings COLLECTION WITH:
//      db.meetings.find().count()

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/aaMeeting';

// Retrieve
var MongoClient = require('mongodb').MongoClient;
    
    MongoClient.connect(url, function(err, db) {
        //handle error
        if (err) {
            return console.dir(err);
        }
    
        var collection = db.collection('meetings');
    
        collection.aggregate( [
    
            { $unwind : { path: "$days", preserveNullAndEmptyArrays: true  } },
            
            { $match : { "days" : "Tuesdays" } },
            
            { $group : {  _id : { 
                meetingGroup: "$groupName",
                meetingHouse : "$locationName",
                meetingAddress : "$address",
                latLong : "$location"
            }, 
                startTime : { $push : "$start" },
                endTime : { $push :"$end" },
                type: { $push : "$type" },
                specialInterest : { $push :"$specialInterest" },
                meetingDetails : { $push :"$meetingDetails" },
                meetingWheelchair : { $push : "$meetingWheelchair" }
            }},
            
            { $group : { _id : { latLong : "$_id.latLong" }, 
                        meetingGroups : { $addToSet : {  meetingGroup : "$_id", 
                                                meetings : {
                                                    startTime : "$start",
                                                    endTime : "$end",
                                                    type:"$type",
                                                    specialInterest :"$specialInterest",
                                                    meetingDetails : "$meetingDetails",
                                                    meetingWheelchair : "$meetingWheelchair"
                                                    }
                        } }
                        } }
            
             ]).toArray(function(err, docs) {
                if (err) {console.log(err);}
                else { 
                    var server = http.createServer(function(req,res){
                    res.writeHead(200,{"content-type" : "application/json"});
                    res.end(JSON.stringify(docs))
                    }).listen(process.env.PORT, process.env.IP)
            
            db.close();
            
        }});
    
    });