var five = require("johnny-five"),
  board, potentiometer, led, bumper;
var sensorValue = 0;  // variable to store the value coming from the sensor
var metronomePulse = 20;
var timeInBtw = 0;
var metronomeBPM = 0;
var oneMinute = 60000; 

require('events').EventEmitter.prototype._maxListeners = 0;

five.Board().on("ready", function() {

  // Create a new `potentiometer` hardware instance.
  potentiometer = new five.Sensor({
    pin: "A0",
    freq: 250,
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
    metronomeBPM = Math.round(60000 / sensorValue);
    console.log(metronomeBPM);
  })
  // }).on("release", function(){
  //   sensorValue=0;
  // })
  

  // led.blink((sensorValue-10)*0.5);
  
  // bumper.on("press", function() {

  //   metronomeBPM = Math.round(60000 / (sensorValue));
  //   console.log(metronomeBPM);
  // });
  


  // "data" get the current reading from the potentiometer
});

