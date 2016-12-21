var fs  = require("fs"); // npm install fs
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var apiKey = process.env.GMAKEY; 
//var MongoClient = require('mongodb').MongoClient, assert = require('assert');
var meetingsData=[];

// export GMAKEY="AIzaSyA6YtuSbV-HpL_vAO171qL6LdUJxF9PiuM"
// printenv | grep GMAKEY (to double check if you've successfully stored your Key)

// IN THE MONGO SHELL: 
//   CREATE DATABASE aaMeeting AND SWITCH TO IT WITH: 
//      use aaMeeting
//   CREATE COLLECTION meetings WITH: 
//      db.createCollection('meetings')
//   QUERY THE ENTIRE meetings COLLECTION WITH:
//      db.meetings.find()
//   COUNT THE NUMBER OF DOCUMENTS IN THE meetings COLLECTION WITH:
//      db.meetings.find().count()


// grab cleaned array of addresses 
var addresses = JSON.parse(fs.readFileSync('/home/ubuntu/workspace/data/manhattan/manhattan10.txt'));

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey; 
    var thisMeeting = value;
    // console.log(apiRequest)
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        if (JSON.parse(body).status != "ZERO_RESULTS") {
            thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        }
        else {console.log(apiRequest);}
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 2000);

}, function() {
    fs.writeFile('/home/ubuntu/workspace/data/manhattanFull/10.txt', JSON.stringify(meetingsData, null, '\t'), function (err) { 
        if (err) 
        return console.log('Error');
        console.log('Wrote ' + meetingsData.length + ' entries to file ' + 'manhattanFull.txt');
        
    });

});
