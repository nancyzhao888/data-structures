var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m01.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus01.txt', body);
    console.log("success")
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m02.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus02.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m03.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus03.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m04.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus04.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m05.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus05.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m06.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus06.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m07.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus07.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m08.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus08.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m09.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus09.txt', body);
  }
  else {console.error('request failed')}
})

var request = require('request');
var fs = require('fs');

request('http://visualizedata.github.io/datastructures/data/m10.html', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    fs.writeFileSync('/home/ubuntu/workspace/data/syllabus10.txt', body);
  }
  else {console.error('request failed')}
})
   