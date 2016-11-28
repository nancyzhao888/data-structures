console.log(locations);
console.log(addresses);
console.log(meetings);
console.log(wheelChair);


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
});

//mongo

meetingName: meetingNameClean[i],
locations:
address: thisMeeting.address,
addressWhole: addressesFloors[i],
latlong : thisMeeting.latLong,
additionalInfo: additionalInfo[i],
hours: hoursSplit[i],
accessibility: wheelChair[i]


function cleanUpNames(oldNames) {
    
    var newNames;
    
    var first = oldNames.substr(0, oldNames.indexOf('-') - 1); // all "-" has a blank space in front
    var second = oldNames.substr(oldNames.indexOf('-') + 2);
    
    if (first == second.toUpperCase()) {
        newNames = first;
    } else if (second == "") {
        newNames = first;
    } else {
        newNames = second.toUpperCase();
    }
     return newNames;
}