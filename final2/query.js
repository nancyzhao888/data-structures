var pg = require('pg');
var fs = require('fs');
var http = require('http');

// connection string
var un = 'NancyZ'; // aws db username
var pw = 'password'; // aws db password
var db = 'theBeatMap'; // aws db database name
var ep = 'thebeatmap.ck2shkhomros.us-east-1.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
console.log(conString);

var createTableQuery = "CREATE TABLE music (genre varchar(50), metronomeBpm smallint, monthCreated timestamp DEFAULT current_timestamp);"
var insertIntoQuery = "INSERT INTO music VALUES ('R&B', 73, DEFAULT);"
var query = "SELECT * FROM music;" //sum(amount), avg(amount), comma is used to separate columns of select
var dropTable = "DROP TABLE music"
var complexQuery = "SELECT genre, metronomeBpm, EXTRACT(hour from monthCreated) as month FROM music ORDER BY month;"

var server = http.createServer(function(req, res) { // for every request, callback a res
    console.log('server started');
   
    pg.connect(conString, function(err, client, done) {
    
        if (err) {
            return console.error('error fetching client from pool', err);
        }
    
        // query can also mean putting things into something (instead of just taking things out)
        client.query(complexQuery, function(err, result) {
            //call `done()` to release the client back to the pool
            done();
    
            if (err) {
                return console.error('error running query', err);
            }
            res.writeHead(200, {'content-type': 'application/json'});
                res.write(JSON.stringify(result.rows)); //stringify the result of the request
                res.end();
                
                fs.writeFileSync('output.json', JSON.stringify(result.rows));
        });
    });
});

server.listen(process.env.PORT);