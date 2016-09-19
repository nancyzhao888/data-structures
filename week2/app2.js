var fs = require('fs');
var cheerio = require('cheerio');

var content = fs.readFileSync('/home/ubuntu/workspace/data/syllabus01.txt');

var $ = cheerio.load(content);

// Print to console: all street addresses

$('table').each(function(i, elem) {
    if ($(elem).attr("cellpadding") == '5') {
        $(elem).find('tr').each(function(i, elem) {
            $(elem).find('td').eq(0).each(function(i, elem) {
                    console.log(($(elem).html().split('<br>')[2]));
                    console.log(($(elem).html().split('<br>')[3]));
            });
        });
    }
});

// write console.log output into address01.txt using: node app2.js > address01.txt
