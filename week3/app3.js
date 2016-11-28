var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');

// SETTING ENVIRONMENT VARIABLES (in Linux): 
// in terminal: export NEW_VAR="Content of NEW_VAR variable" (Linux variable in the server)
// printenv | grep NEW_VAR (retrieving the variable)
// export GMAKEY="AIzaSyA6YtuSbV-HpL_vAO171qL6LdUJxF9PiuM"
// printenv | grep GMAKEY (to double check if you've successfully stored your Key)

var apiKey = process.env.GMAKEY; 

var meetingsData = [];
var addresses = [];
var cleanAddress=[];

var addresses = JSON.parse(fs.readFileSync("/home/ubuntu/workspace/data/address01_solution.txt"));

for(var i = 0; i<addresses.length; i++) {
    addresses[i] = addresses[i].substring(0, addresses[i].indexOf(',')) + ', New York, NY';
}

console.log(addresses);

// eachSeries in the async module iterates over an array and operates on each item in the array in series
// in order not to break the 50 request / second rule

async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.split(' ').join('+') + '&key=' + apiKey;
    var thisMeeting = new Object;
    thisMeeting.address = value;
    
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        thisMeeting.latLong = JSON.parse(body).results[0].geometry.location;
        meetingsData.push(thisMeeting);
    });
    setTimeout(callback, 1500);
 }, function() {
//     //console.log(meetingsData);
    fs.writeFileSync('/home/ubuntu/workspace/data/addressArray01.txt', JSON.stringify(meetingsData));
});
// think about how you want to structure your arrays, in terms of hierarchy