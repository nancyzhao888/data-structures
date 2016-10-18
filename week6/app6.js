var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); 
var cheerio = require('cheerio'); // npm install cheerio

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

var apiKey = process.env.GMAKEY; 
var content = fs.readFileSync('/home/ubuntu/workspace/data/syllabus01.txt');
var $ = cheerio.load(content);
var meetings = [];

   
$('tbody').find('tr').each(function(i, elem){
     var meeting = new Object; 
     $(elem).find('td').eq(0).each(function(i, elem) {
        meeting.locationName = String($(elem).find('h4').text().replace(/[\']/g, "'"));
        meeting.groupName = groupClean($(elem).find('b').text().replace(/[\']/g, "'").trim());
        meeting.address = addressClean($(elem).html().split('<br>')[2].trim());
        meeting.accessibility = $(elem).find('img').attr('alt');
        meeting.detail = $(elem).find('div').text().trim().replace('*', "");
     });
     $(elem).find('td').eq(1).each(function(i, elem) {
        var text = $(elem).html().replace('\r\n                    \t\t\r\n\t\t\t\t\t', '').replace(/[\r\n\t\/]/g, '').replace(/(<br>)/g, '').replace(/(<b>)/g, '').trim().split('                                               ');
        
        var day = text.slice(0);
        for(var j=0;j<day.length;j++){
        day[j] = day[j].substring(0,day[j].indexOf("Meeting Type")).split("From")[0].trim();}
        meeting.days = day;
        
        var start = text.slice(0);
        for(var k=0;k<start.length;k++){
        start[k] = resetTime(start[k].substring(0, start[k].indexOf('to')[0]).split('From')[1].trim());}
        // }
        meeting.start = start;
        
        var end = text.slice(0);
        for (var z=0; z<end.length; z++) {
            end[z] = resetTime(end[z].split('From')[1].split('to')[1].split('Meeting Type')[0].trim());
        }
        meeting.end = end;
        
        var type = text.slice(0);
        for (var x=0; x<type.length; x++) {
            type[x] = type[x].substring(type[x].indexOf('Type')+4, type[x].indexOf('=')).trim();
        }
        meeting.type = type;
        
        var special = text.slice(0);
        for (var y=0; y<special.length; y++) {
            if (special[y].includes('Special Interest') === true) {
            special[y] = special[y].split('Special Interest')[1].trim();
             } else {
            special[y] = null }
        }
        meeting.specialInterest = special;
     });
    meetings.push(meeting);
    });


console.log(meetings);
// CLEAN MEETING NAMES

function groupClean(oldName) {
    var cleanName = oldName.substr(0, oldName.indexOf('-') - 1);
    return cleanName;
}

// CLEAN ADDRESS
function addressClean (oldAddress) {
    var cleanAddress = oldAddress; 
    cleanAddress = cleanAddress.substring(0, cleanAddress.indexOf(','));
    
    if (cleanAddress.includes("(") == true) {
        return cleanAddress.substring(0, cleanAddress.indexOf('(') - 1);
    }
    else if (cleanAddress.includes("-") == true){
        return cleanAddress.substring(0, cleanAddress.indexOf('-') - 1);
    }
    return cleanAddress + ", New York, NY";
}


function resetTime(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1].split(' ')[0];
    var period = time.split(' ')[1];
    if (period === 'PM' && hours <= 11) {
        hours = String(Number(hours) + 12);
    }
    return Number(hours + minutes);
}


async.eachSeries(meetings, function(value, key, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        // Assign latLong data to current meeting object
        value.latLong = JSON.parse(body).results[0].geometry.location;
    });
    setTimeout(callback, 2000);
}, function() {
    console.log(meetings);
    fs.writeFileSync('/home/ubuntu/workspace/data/meetings.txt', JSON.stringify(meetings));
});
    
// ------------------

var url = 'mongodb://' + process.env.IP + ':27017/aaMeeting';

var MongoClient = require('mongodb').MongoClient; 

MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }

    var collection = db.collection('meetings');

    // THIS IS WHERE THE DOCUMENT(S) WHERE INSERTED TO MONGO:

    collection.insertMany(meetings);
    console.log("Inserted " + meetings.length + " into the document collection");
    db.close();
    
    }); //MongoClient.connect
