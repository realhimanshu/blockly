/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Servo library blocks.
 *     The Arduino Servo library docs: http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Arduino.servo');

goog.require('Blockly.Arduino');


/**
 * Code generator to set an angle (Y) value to a servo pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo servo_X;
 *               setup { servo_X.attach(X); }
 *               loop  { servo_X.write(Y);  }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['servo_write'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoAngle = Blockly.Arduino.valueToCode(
      block, 'SERVO_ANGLE', Blockly.Arduino.ORDER_ATOMIC) || '90';
  var servoName = 'servo_' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Write');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.write(' + servoAngle + ');\n';
  return code;
};

/**
 * Code generator to read an angle value from a servo pin (X).
 * Arduino code: #include <Servo.h>
 *               Servo servo_X;
 *               setup { servo_X.attach(X); }
 *               loop  { servo_X.read();    }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['servo_read'] = function(block) {
  var pinKey = block.getFieldValue('SERVO_PIN');
  var servoName = 'servo_' + pinKey;

  Blockly.Arduino.reservePin(
      block, pinKey, Blockly.Arduino.PinTypes.SERVO, 'Servo Read');

  Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
  Blockly.Arduino.addDeclaration('servo_' + pinKey, 'Servo ' + servoName + ';');

  var setupCode = servoName + '.attach(' + pinKey + ');';
  Blockly.Arduino.addSetup('servo_' + pinKey, setupCode, true);

  var code = servoName + '.read()';
  return [code, Blockly.Arduino.ORDER_ATOMIC];
};

Blockly.Arduino['servo_move'] = function(block) {
    var byteaddress = block.getFieldValue('address');
    var angle = block.getFieldValue('angle');
    var servoName = 'servo_ba_' + byteaddress;
  
    Blockly.Arduino.reservePin(
        block, byteaddress, Blockly.Arduino.PinTypes.SERVO, 'Servo Read');
  
    Blockly.Arduino.addInclude('servo', '#include <Servo.h>');
    Blockly.Arduino.addInclude('wire', '#include <Wire.h>');
    Blockly.Arduino.addDeclaration('servo_' + byteaddress, 'Servo ' + servoName + ';');
  
    var setupCode = servoName + '.attach(' + byteaddress + ');';
    Blockly.Arduino.addSetup('servo_' + byteaddress, setupCode, true);
  
    // var code = servoName + '.read()';
    var code = 'byte values[1] = {' + angle + '};\nWire.beginTransmission(' + byteaddress + ');\nWire.write(values, 1);\nWire.endTransmission(true)';
    return [code, Blockly.Arduino.ORDER_ATOMIC];
  };
  