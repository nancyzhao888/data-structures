var pg = require('pg');
var http = require('http');
var fs = require('fs');

// connection string
var un = 'NancyZ'; // aws db username
var pw = 'password'; // aws db password
var db = 'theBeatMap'; // aws db database name
var ep = 'thebeatmap.ck2shkhomros.us-east-1.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
console.log(conString);

//var createTableQuery = "CREATE TABLE music (genre varchar(50), metronomeBpm smallint, monthCreated timestamp DEFAULT current_timestamp);"
//var insertIntoQuery = "INSERT INTO music VALUES ('R&B', 73, DEFAULT);"
var query = "SELECT * FROM music;" 
//var del = "DROP TABLE music;"

var server = http.createServer(function(req, res) {
    console.log('server started');
    
        pg.connect(conString, function(err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
    
        client.query(query, function(err, result) {
            //call `done()` to release the client back to the pool
            done();
    
            if (err) {
                return console.error('error running query', err);
            }
            
            res.writeHead(200, {'content-type': 'application/json'});
            res.write(JSON.stringify(result.rows));
            res.end();
            
            fs.writeFileSync('output.json', JSON.stringify(result.rows));
            
            
        });
    });

});

server.listen(process.env.PORT);