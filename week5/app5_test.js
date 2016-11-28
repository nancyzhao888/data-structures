var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); 
var cheerio = require('cheerio'); // npm install cheerio

// export GMAKEY="AIzaSyA6YtuSbV-HpL_vAO171qL6LdUJxF9PiuM"
// printenv | grep GMAKEY (to double check if you've successfully stored your Key)

var apiKey = process.env.GMAKEY; 

var content = fs.readFileSync('/home/ubuntu/workspace/data/syllabus01.txt');
var locations = [];
var addresses = [];
var meetings = [];
var meetingsClean = [];
var wheelChair = [];
var additionalInfo = [];
var meetingDetail = [];
var meetingDetailClean = [];
var meetingsAddress = [];



var $ = cheerio.load(content);

$('tbody').find('tr').each(function(i, elem){
     $(elem).find('td').eq(1).each(function(i, elem) {
        data = $(elem).contents().text().trim().replace(/[ \t]+/g, " ").replace(/[\r\n|\n]/g, " "));
    var meeting = new Object;
            // Assign the info to the object
            meeting.address = $(elem).find('td').eq(0).html().split('<br>')[2].trim().substring(0, addresses[i].indexOf(',')) + ', New York, NY';
            meeting.days = text.split('From')[0].trim();
            meeting.start = convertTo24Hour(text.split('From')[1].split('to')[0].trim());
            meeting.end = convertTo24Hour(text.split('From')[1].split('to')[1].split('Meeting Type')[0].trim());
            meeting.type = text.split('Meeting Type')[1].split('=')[0].trim();
            meeting.accessibility = $(elem).find('img').attr('alt');
            meeting.additionalInfo = $(elem).find('div').text().trim();
            // Assign special interest info - if special interest doesn't exist then set 'interest' to null 
            if (text.indexOf('Special Interest') !== -1)
                meeting.interest = text.split('Special Interest')[1].trim();
            else
                meeting.interest = null;
            // Push meeting object into meetings array
            meetings.push(meeting);
        }
     $(elem).find('td').eq(0).each(function(i, elem) {
        locations.push($(elem).find('h4').text().replace(/[\']/g, "'"));
        addresses.push($(elem).html().split('<br>')[2].trim());
        meetings.push($(elem).find('b').text().replace(/[\']/g, "'"));
        wheelChair.push($(elem).find('img').attr('alt'));
        additionalInfo.push($(elem).find('div').text().trim());
    });
    $(elem).find('td').eq(1).each(function(i, elem) {
        meetingDetail.push($(elem).contents().text().trim().replace(/[ \t]+/g, " ").replace(/[\r\n|\n]/g, " "));
    });
});

// console.log(locations.length);
// console.log(addresses.length);
// console.log(meetings.length);
// console.log(wheelChair.length);
// console.log(additionalInfo.length);
// console.log(time.length); // print number of meetings in meetings array


// CLEAN UP MEETING TIME
for (var i in meetingDetail) {
    meetingDetail[i] = meetingDetail[i].split("           ");
    for (var j in meetingDetail[i]) {
        meetingDetail[i][j] = meetingDetail[i][j].trim();
    }
}
function convertTo24Hour(time) {
    var hours = time.split(':')[0];
    var minutes = time.split(':')[1].split(' ')[0];
    var period = time.split(' ')[1];
    if (period === 'PM' && hours <= 11) {
        hours = String(Number(hours) + 12);
    }
    return Number(hours + minutes);
}

function cleanDetail(oldDetail) {
    var days = oldDetail.split(" ")[0];
    var startTime = oldDetail.split(" ")[2].split(":")[0];
    var startAmPm = oldDetail.split(" ")[3]
    var endTime = oldDetail.split(" ")[5];
    var endAmPm = oldDetail.split(" ")[6];
    var type = oldDetail.split(" ")[9];
    return {
        "days": days,
        "startTime": startTime + " " + startAmPm,
        "endTime": endTime + " " + endAmPm,
        "type": type
    }
}

for (var i in meetingDetail) {
    for (var j in meetingDetail[i]) {
        meetingDetail[i][j] = cleanDetail(meetingDetail[i][j])
    }
    meetingDetailClean.push(meetingDetail[i]);
}
// CLEAN UP MEETING NAME
for (var i in meetings) {
  meetingsClean.push(meetings[i].substr(0, meetings[i].indexOf('-') - 1)); // problem with 2 "-"s and removing extra character
}
   
// CLEAN UP ADDRESS 
for(var i = 0; i<addresses.length; i++) {
    addresses[i] = addresses[i].substring(0, addresses[i].indexOf(',')) + ', New York, NY';
}
console.log(addresses);

// CALL API 
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsAddress.push(thisMeeting);
    });
    setTimeout(callback, 1500);
});

console.log(meetingsAddress);

// INSERT DOCUMENTS INTO MONGO

var url = 'mongodb://' + process.env.IP + ':27017/aaMeeting';

// Retrieve
var MongoClient = require('mongodb').MongoClient; // npm install mongodb

MongoClient.connect(url, function(err, db) {
    if (err) {
        return console.dir(err);
    }

    var collection = db.collection('meetings');

    // THIS IS WHERE THE DOCUMENT(S) IS/ARE INSERTED TO MONGO:
    
    for (var i = 0; i < 23; i++) {
        collection.insert({
            meetingName: meetingsClean[i],
            location:locations[i],
            address: meetingsAddress[i].address,
            geocode: meetingsAddress[i].latLong,
            section: meetingDetailClean[i],
            accessibility: wheelChair[i],
            additionalInfo: additionalInfo[i]
        });
    }
    db.close();
}); 