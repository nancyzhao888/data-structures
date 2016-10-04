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

function cleanDetail(oldDetail) {
    var days = oldDetail.split(" ")[0];
    var startHour = oldDetail.split(" ")[2].split(":")[0];
    var startMinute = oldDetail.split(" ")[2].split(":")[1];
    var startAmPm = oldDetail.split(" ")[3]
        if (startAmPm === 'PM' && startHour <= 11) {
        startHour = String(Number(startHour) + 12);
    }
  
    var endHour = oldDetail.split(" ")[5].split(":")[0];
    var endMinute = oldDetail.split(" ")[5].split(":")[1];
    var endAmPm = oldDetail.split(" ")[6];
    if (endAmPm === 'PM' && endHour <= 11) {
        endHour = String(Number(endHour) + 12);
    }

    var type = oldDetail.split(" ")[9];
    return {
        "days": days,
        "startTime": startHour + startMinute,
        "endTime": endHour + endMinute,
        "type": type
    }
}

for (var i in meetingDetail) {
    for (var j in meetingDetail[i]) {
        meetingDetail[i][j] = cleanDetail(meetingDetail[i][j])
    }
    meetingDetailClean.push(meetingDetail[i]);
}

console.log(meetingDetailClean);
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
    
    for (var i = 0; i < meetingsAddress.length; i++) {
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