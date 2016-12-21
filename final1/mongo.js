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

var index1 = fs.readFileSync('/home/ubuntu/workspace/final1/index1.txt');
var index3 = fs.readFileSync('/home/ubuntu/workspace/final1/index3.txt');

// Connection URL
var url = 'mongodb://' + process.env.IP + ':27017/aaMeeting';

// Retrieve
var MongoClient = require('mongodb').MongoClient;

var server = http.createServer(function(req, res) {   
    
    MongoClient.connect(url, function(err, db) {
        //handle error
        if (err) {
            return console.dir(err);
        }
        
        // var dateTimeNow = new Date();
        // var today = dateTimeNow.getDay();
        // var tomorrow;
        // if (today == 6) {tomorrow = 0;}
        // else {tomorrow = today + 1}
        // var hour = (dateTimeNow.getHours() - 5) * 100;
        
        // var weekday = new Array(7);
        // weekday[0] = "Sunday";
        // weekday[1] = "Monday";
        // weekday[2] = "Tuesday";
        // weekday[3] = "Wednesday";
        // weekday[4] = "Thursday";
        // weekday[5] = "Friday";
        // weekday[6] = "Saturday";
        
        // today = weekday[today] + "s";
        // tomorrow = weekday[tomorrow] + "s";
        
        var collection = db.collection('meetings');
    
        collection.aggregate([
    
        {
            $unwind: {
                path: "$days",
                includeArrayIndex: "idx"
            }
        },
        {
            $project: {
                _id: 1,
                locationName: 1,
		        groupName: 1,
		        address: 1,
		        accessibility: 1,
		        detail: 1,
                days: 1,
                start: { $arrayElemAt: ["$start", "$idx"] },
                end: { $arrayElemAt: ["$end", "$idx"] },
	            type: { $arrayElemAt: ["$type", "$idx"] },
			    specialInterest: { $arrayElemAt: ["$specialInterest", "$idx"] },
		        latLong: 1,
            }
        },

            
            // { $match : 
            //     { $or : [
            //         { $and: [
            //             { dayQuery : today } , { hourQuery : { $gte: hour } }
            //         ]},
            //         { $and: [
            //             { dayQuery : tomorrow } , { hourQuery : { $lte: 400 } }
            //         ]}
            //     ]}
            // },
            
            
            { 
                $group : {  _id : { 
                    latLong: "$latLong",
                    meetingGroup: "$groupName",
                    meetingHouse: "$locationName",
                    meetingAddress: "$address",
                    // specialInterest: "$specialInterest",
                    meetingDetails: "$detail",
                    meetingWheelchair: "$accessibility"
            }, 
                meetingDay : { $push : "$days" },
                startTime: { $push : "$start" },
                type: { $push : "$type" }
            }},
            
            // group meeting groups by latLong
            { 
                $group : { 
                    _id : { 
                            latLong : "$_id.latLong"
                    },
                    meetingGroups : { 
                        $push : { 
                            groupInfo : "$_id", 
                            meetingDay : "$meetingDay", 
                            meetingStartTime : "$startTime", 
                            meetingType : "$type" 
                        } }
                        } }
                        
             ]).toArray(function(err, docs) {
            if (err) {
                console.log(err);
            }

            else {
                //fs.writeFileSync('/home/ubuntu/workspace/final1/output_all.txt', JSON.stringify(docs)); // save results to text file
                //res.writeHead(200, {"Content-Type": "application/json"});
                //res.end(JSON.stringify(docs));
                res.writeHead(200, {
                    'content-type': 'text/html'
                });
                res.write(index1);
                res.write(JSON.stringify(docs));
                res.end(index3);
            }
            db.close();
            // console.log("This process completed in", new Date() - datetimeStart, "milliseconds.");
        });
        
    });
    // });
});

server.listen(process.env.PORT);