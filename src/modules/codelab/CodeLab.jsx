import React from 'react';
import { Terminal, Copy, Download } from 'lucide-react';

const CodeSnippet = ({ title, code, language = "cpp" }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(code);
        alert("Copied to clipboard!");
    };

    return (
        <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700 my-6 shadow-2xl">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                    <div className="flex space-x-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                    </div>
                    <span className="text-xs text-slate-400 font-mono ml-3">{title}</span>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={copyToClipboard}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded transition-colors"
                        title="Copy Code"
                    >
                        <Copy size={16} />
                    </button>
                </div>
            </div>
            <div className="p-4 overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed text-slate-300">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
};

const CodeLab = () => {
    const arduinoCode = `
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
}
    `;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="border-b border-slate-800 pb-6">
                <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
                    <Terminal className="mr-3 text-indigo-500" /> Code Lab
                </h1>
                <p className="text-slate-400 text-lg">
                    Build your own flight controller code from scratch.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                <div>
                    <h2 className="text-xl font-bold text-white mb-4">Motor Control Basics</h2>
                    <p className="text-slate-300 mb-4 leading-relaxed">
                        Standard Electronic Speed Controllers (ESCs) use a protocol similar to PWM servos.
                        They accept a pulse width signal between <strong>1000us</strong> (0% throttle) and <strong>2000us</strong> (100% throttle).
                    </p>

                    <div className="bg-indigo-900/20 border border-indigo-500/30 p-4 rounded-lg mb-6">
                        <h4 className="font-bold text-indigo-400 text-sm uppercase mb-2">Safety First</h4>
                        <p className="text-sm text-indigo-200">
                            Always remove propellers when testing motor code on the bench. A spinning prop can cause serious injury.
                        </p>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-2">Next Steps</h3>
                    <ul className="list-disc list-inside text-slate-300 space-y-2">
                        <li>Integrate an IMU (MPU6050) to read Gyro data.</li>
                        <li>Implement a PID loop to stabilize the motors based on gyro error.</li>
                        <li>Add Receiver (RX) input reading.</li>
                    </ul>
                </div>

                <div>
                    <CodeSnippet title="arduino_motor_test.ino" code={arduinoCode} />
                </div>
            </div>
        </div>
    );
};

export default CodeLab;
