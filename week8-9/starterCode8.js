// PRESS YOUR LUCK button
// https://youtu.be/fnTbO26u9bQ

var pg = require('pg');

// connection string
var un = 'NancyZ'; // aws db username
var pw = 'password'; // aws db password
var db = 'thebeatmap'; // aws db database name
var ep = 'thebeatmap.ck2shkhomros.us-east-1.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
//console.log(conString);

//var createTableQuery = "CREATE TABLE wham (message varchar(100) , dateCreated timestamp DEFAULT current_timestamp, whammy boolean, amount smallint);"
// var insertIntoQuery = "INSERT INTO wham VALUES ('No whammy!!!', DEFAULT, FALSE, 100);"

// var query = "SELECT avg(amount) as avgAmount, EXTRACT(DOW from dateCreated) as dowAverage FROM wham WHERE dateCreated >='2016-10-31' GROUP BY dateCreated ORDER BY dowAverage;"; //sum(amount), avg(amount), comma is used to separate columns of select
//var complexQuery = "SELECT sum(amount) as total FROM wham GROUP BY whammy;"

var query = "SELECT * FROM wham WHERE dateCreated>=DATE '2016-10-31'";
var runTotal=[]; 

pg.connect(conString, function(err, client, done) { //connet to database. where is the db? callback function.
    if (err) {
        return console.error('error fetching client from pool', err);
    }

    client.query(query, function(err, result) {
        //call `done()` to release the client back to the pool
        done();
        var currentTotal=0;
        
        if (err) {
            return console.error('error running query', err);
        }
        //console.log(result.rows);
        for (var i=0; i < result.rows.length; i++) {
            console.log(result.rows[i].amount);
            //print the amount for each row in the array
            if (result.rows[i].amount > 0) {
                currentTotal = currentTotal + result.rows[i].amount;
            }
            else {
                runTotal.push(currentTotal); //log the current amount when whammy happens
                currentTotal = 0;
            }
        }
        console.log(runTotal);
    });

});