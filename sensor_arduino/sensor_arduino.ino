#include  "PinChangeInt.h"
#include "eHealth.h"

int cont = 0;

// The setup routine runs once when you press reset:
void setup() {
  //Configuracion oxitometro
    eHealth.initPulsioximeter();
    //Attach the inttruptions for using the pulsioximeter.
    PCintPort::attachInterrupt(6, readPulsioximeter, RISING);
  
  
  Serial.begin(9600);  
  //Serial1.begin(9600);  
}
//int tiempo = 0;
// The loop routine runs over and over again forever:
void loop() {
  
  float ECG = eHealth.getECG();
  if(ECG>2.3){
    ECG = map(ECG, 2.3, 4, 3, 10);
  }else{
    ECG = map(ECG, 0, 2.3, 2, 3);
  }
  //tiempo+=1;

  int airFlow = eHealth.getAirFlow();
  Serial.print(ECG, 2);
  //Serial.print(","); 
  //Serial.print(tiempo); 
  Serial.print(","); 
  Serial.print(eHealth.getBPM());
  Serial.print(","); 
  Serial.print(eHealth.getOxygenSaturation());
  Serial.print(","); 
  //Serial.print(eHealth.airFlowWave(airFlow));
  //Serial.print(","); 
  Serial.print( map(airFlow, 0, 200, 0, 100) ); //map(value, fromLow, fromHigh, toLow, toHigh)
  Serial.print(","); 
  Serial.println(airFlow); 

  
  ;
  
  //Serial.print("\"ECG\":");
  //Serial.print(ECG, 2);
  //Serial.print(",");

  //Serial.print("\"tiempo\":");
  //Serial.print(tiempo);
  //Serial.print(",");
  
  //Serial.print("}");
  //Serial.println(""); 
  
  delay(50);
}

//Include always this code when using the pulsioximeter sensor
//=========================================================================
void readPulsioximeter(){

  cont ++;

  if (cont == 50) { //Get only of one 50 measures to reduce the latency
    eHealth.readPulsioximeter();
    cont = 0;
  }
}
