var pg = require('pg');

// connection string
var un = 'NancyZ'; // aws db username
var pw = 'password'; // aws db password
var db = 'theBeatMap'; // aws db database name
var ep = 'thebeatmap.ck2shkhomros.us-east-1.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
console.log(conString);

var createTableQuery = "CREATE TABLE music (genre varchar(50), metronomeBpm smallint, monthCreated timestamp DEFAULT current_timestamp);"
var insertIntoQuery = "INSERT INTO music VALUES ('pop', 90, DEFAULT);"
var query = "SELECT * FROM music;" //sum(amount), avg(amount), comma is used to separate columns of select
//var complexQuery = "SELECT sum(amount) as total FROM wham GROUP BY whammy;"

pg.connect(conString, function(err, client, done) {

    if (err) {
        return console.error('error fetching client from pool', err);
    }

    // query can also mean putting things into something (instead of just taking things out)
    client.query(createTableQuery, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result);
    });
});