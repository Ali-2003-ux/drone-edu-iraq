
// Simple Arduino Drone Motor Test
// CAUTION: Remove propellers before testing!

#include <Servo.h>

Servo m1, m2, m3, m4;

void setup() {
  // Attach motors to PWM pins
  m1.attach(3);
  m2.attach(5);
  m3.attach(6);
  m4.attach(9);

  // Calibrate ESCs (Sending min throttle)
  writeAll(1000);
  delay(2000);
}

void loop() {
  // Ramp up
  for (int speed = 1000; speed <= 1200; speed += 5) {
    writeAll(speed);
    delay(20);
  }

  delay(1000);

  // Ramp down
  for (int speed = 1200; speed >= 1000; speed -= 5) {
    writeAll(speed);
    delay(20);
  }

  delay(2000);
}

void writeAll(int speed) {
  m1.writeMicroseconds(speed);
  m2.writeMicroseconds(speed);
  m3.writeMicroseconds(speed);
  m4.writeMicroseconds(speed);
}
