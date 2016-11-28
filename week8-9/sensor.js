var five = require("johnny-five"),
  board, potentiometer, led;
var sensorValue = 0;  // variable to store the value coming from the sensor
var metronomePulse = 20;
var timeInBtw = 0;
var metronomeBPM = 0;
var oneMinute = 60000; 


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

  led.blink(sensorValue);
  
  // if(loop) {
    
  //   clearInterval(loop);
  // }

  // var loop = setInterval(function() { 
    
  //   led.on();

  //   setTimeout(function() {
      
  //     led.off();
      
  //   }, sensorValue);

  // }, sensorValue * 2);
  bumper.on("hit", function() {

    metronomeBPM = Math.round(60000 / (sensorValue));
    console.log(metronomeBPM);
  })
  
  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  //board.repl.inject({
    //pot: potentiometer
  //});

  // "data" get the current reading from the potentiometer
});

});