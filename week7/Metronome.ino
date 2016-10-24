int ledPin = 13;          // LED and Piezo
int sensorPin = A0;    // select the input pin for the potentiometer
int sensorValue = 0;  // variable to store the value coming from the sensor
int metronomePulse = 20;
int timeInBtw = 0;
int metronomeBPM = 0;
int oneMinute = 60000; // 60000 ms per minute


// the setup routine runs once when you press reset:
void setup() {                
  // initialize the digital pin as an output.
  pinMode(ledPin, OUTPUT);    
  Serial.begin(9600); 
}

// the loop routine runs over and over again forever:
void loop() {
  sensorValue = analogRead(sensorPin); 
  digitalWrite(ledPin, HIGH);   
  delay(metronomePulse);   // Use a 20 ms pulse for lights on
  digitalWrite(ledPin, LOW);    
  delay(sensorValue);      // Take potentiometer as the metronome interval (offset 10ms).
  
  timeInBtw = sensorValue + metronomePulse;
  metronomeBPM = 60000 / timeInBtw;
  
  Serial.println(metronomeBPM);
}
