var fs = require('fs');
var request = require('request'); // npm install request
var async = require('async'); 
var cheerio = require('cheerio'); // npm install cheerio

// export GMAKEY="AIzaSyA6YtuSbV-HpL_vAO171qL6LdUJxF9PiuM"
// printenv | grep GMAKEY (to double check if you've successfully stored your Key)

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
        var text = $(elem).contents().text().trim().replace(/[ \t]+/g, " ").replace(/[\r\n|\n]/g, " ").replace('             ',',').replace('            ',',');
   
        //for (var j in data) {
          //  var text = data[j].replace('             ',",").replace('            ',",").split(',')}
        //console.log(text);
        var days = text.split(' ');
        for (var j in days) {
            for (var v in days[j]) {
          days[j][v] = days[j][v].match(/days/g)} }
        //  meeting.days = data[j].split('From')[0].trim(); }
        // meeting.text = text.split("           ");
        meeting.days = days;
        console.log(meeting.days);
        
        var start = text.split("             ");
        for (var k in start) {
            start[k] = resetTime(start[k].split('From')[1].split('to')[0].trim());
        }
        meeting.start = start;
        
        var end = text.split("             ");
        for (var z in end) {
            end[z] = resetTime(end[z].split('From')[1].split('to')[1].split('Meeting Type')[0].trim());
        }
        meeting.end = end;
        
        var type = text.split("             ");
        for (var x in type) {
            type[x] = type[x].split(" ")[9];
        }
        meeting.type = type;
        
        var special = text.split("            ");
        for (var y in special) {
            if (special[y].includes('Special Interest') === true) {
            special[y] = special[y].split('Special Interest')[1].trim();
             } else {
            special[y] = "" }
        }
        meeting.specialInterest = special;
     });
    meetings.push(meeting);
    });
    

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

// CLEAN TIME
function cleanDetail(oldDetail) {
    

    var type = oldDetail.split(" ")[9];
    var specialInterest;
    
    if (oldDetail.includes('Special Interest') === true) {
    specialInterest = oldDetail.split('Special Interest')[1].trim();
    } else {
    specialInterest = null}
    
    return {
    };
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

console.log (meetings);

async.eachObject(meetings, function(value, key, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.address.split(' ').join('+') + '&key=' + apiKey;
    request(apiRequest, function(err, resp, body) {
        if (err) { throw err; }
        // Assign latLong data to current meeting object
        value.latLong = JSON.parse(body).results[0].geometry.location;
    });
    // Not sure but I think the the callback delay isn't working because the data came out immediately
    setTimeout(callback, 2000);
}, function() {
    console.log(meetings);
    
});
    
