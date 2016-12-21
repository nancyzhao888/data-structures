var pg = require('pg');
var five = require('johnny-five'),
  board, potentiometer, led, bumper;
var sensorValue = 0;  // variable to store the value coming from the sensor
var metronomeBpm = 0;
var genre = 'pop';

// connection string
var un = 'NancyZ'; // aws db username
var pw = 'password'; // aws db password
var db = 'theBeatMap'; // aws db database name
var ep = 'thebeatmap.ck2shkhomros.us-east-1.rds.amazonaws.com:5432'; // aws db endpoint
var conString = "postgres://" + un + ":" + pw + "@" + ep + "/" + db;
console.log(conString);

five.Board().on("ready", function() {

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 250
  });

  led = new five.Led(13);
  bumper = new five.Button(2);
  
  potentiometer.on('data', function() {
    
    if(sensorValue === this.value){
      return;
    }
    
    sensorValue = this.value;
    
    led.blink((sensorValue-10)*0.5);
  });
  
  bumper.on("down", function(){
    
    metronomeBpm = Math.round(60000 / sensorValue);
    
    console.log(metronomeBpm);
      
    var insertIntoQuery = "INSERT INTO songs VALUES ('pop', " + metronomeBpm + " , DEFAULT);"
    // console.log(insertIntoQuery);
    
    pg.connect(conString, function(err, client, done) {

    if (err) {
        return console.error('error fetching client from pool', err);
    }

    // query can also mean putting things into something (instead of just taking things out)
    client.query(insertIntoQuery, function(err, result) {
        //call `done()` to release the client back to the pool
        done();

        if (err) {
            return console.error('error running query', err);
        }
        console.log(result.rows);
      });
    })
  });
});

      