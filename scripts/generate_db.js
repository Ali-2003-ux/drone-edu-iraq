import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const brands = ['T-Motor', 'SpeedyBee', 'DJI', 'BetaFPV', 'Foxeer', 'RushFPV', 'BrotherHobby', 'iFlight', 'Matek', 'Lumenier', 'Ethix', 'TBS', 'Gemfan', 'HQProp'];
const categories = ['Motor', 'Flight Controller', 'ESC', 'Video Transmitter', 'Camera', 'Frame', 'Propeller', 'Receiver'];

const motorSizes = ['2207', '2306', '2806', '2807', '2004', '1404', '1103'];
const kvs = [1700, 1750, 1800, 1950, 2450, 2550, 3500, 4500];
const fcMcus = ['F405', 'F411', 'F722', 'H743'];
const escAmps = [35, 45, 50, 55, 60, 65];

const generateDesc = (brand, cat, name) => `The ${brand} ${name} is a high-performance ${cat} designed for professional pilots. Features premium components and reliable build quality.`;

const db = [];

// Generators
const generateMotors = () => {
    brands.forEach(brand => {
        motorSizes.forEach(size => {
            kvs.forEach(kv => {
                const voltage = kv < 2000 ? '6S' : '4S';
                db.push({
                    id: `motor_${brand}_${size}_${kv}`.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                    category: 'Motor',
                    brand,
                    name: `${brand} ${size} ${kv}KV`,
                    specs: { kv, size, voltage, weight: `${20 + Math.random() * 15 | 0}g`, shaft: 'M5' },
                    compatibility: { prop_mount: 'M5', esc_min_amp: 40 },
                    iraq_availability: Math.random() > 0.4,
                    availability_status: Math.random() > 0.6 ? 'In Baghdad' : (Math.random() > 0.5 ? 'In Erbil' : 'Import Only'),
                    tags: ['Freestyle', 'Cinematic'],
                    image: `https://placehold.co/200?text=${brand}+${size}`,
                    description: generateDesc(brand, 'Motor', `${size} ${kv}KV`)
                });
            });
        });
    });
};

const generateFCs = () => {
    brands.filter(b => ['SpeedyBee', 'T-Motor', 'iFlight', 'Matek', 'BetaFPV'].includes(b)).forEach(brand => {
        fcMcus.forEach(mcu => {
            db.push({
                id: `fc_${brand}_${mcu}`.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                category: 'Flight Controller',
                brand,
                name: `${brand} ${mcu} Pro FC`,
                specs: { mcu, gyro: 'BMI270', uart_count: 4 + Math.floor(Math.random() * 3), input_voltage: '3-6S', mounting: '30x30' },
                compatibility: { mounting: '30x30' },
                iraq_availability: Math.random() > 0.3,
                availability_status: Math.random() > 0.6 ? 'In Baghdad' : (Math.random() > 0.5 ? 'In Erbil' : 'Import Only'),
                tags: ['Analog', 'HD Ready'],
                image: `https://placehold.co/200?text=${brand}+${mcu}`,
                description: generateDesc(brand, 'FC', `${mcu} Pro`)
            });
        });
    });
};

const generateESCs = () => {
    brands.filter(b => ['SpeedyBee', 'T-Motor', 'iFlight', 'RushFPV', 'Foxeer'].includes(b)).forEach(brand => {
        escAmps.forEach(amp => {
            db.push({
                id: `esc_${brand}_${amp}`.toLowerCase().replace(/[^a-z0-9]/g, '_'),
                category: 'ESC',
                brand,
                name: `${brand} ${amp}A 4-in-1`,
                specs: { current: `${amp}A`, burst: `${amp + 10}A`, input_voltage: '3-6S', firmware: 'BLHeli_32' },
                compatibility: { mounting: '30x30' },
                iraq_availability: Math.random() > 0.3,
                availability_status: Math.random() > 0.6 ? 'In Baghdad' : (Math.random() > 0.5 ? 'In Erbil' : 'Import Only'),
                tags: ['High Current', 'Durable'],
                image: `https://placehold.co/200?text=${brand}+${amp}A`,
                description: generateDesc(brand, 'ESC', `${amp}A 4-in-1`)
            });
        });
    });
};

// Seed specific high-quality parts first (Manual Overrides)
db.push(
    {
        "id": "vtx_dji_o3",
        "category": "Video Transmitter",
        "brand": "DJI",
        "name": "O3 Air Unit",
        "specs": { "resolution": "1080p/100fps", "latency": "30ms", "range": "10km+", "voltage": "7.4-26.4V" },
        "compatibility": { "goggles": "DJI Goggles 2", "mounting": "25.5x25.5" },
        "iraq_availability": true,
        "availability_status": "In Baghdad",
        "tags": ["HD", "4K Recording"],
        "image": "https://placehold.co/200?text=O3+Air+Unit",
        "description": "The market leader for HD FPV."
    }
);
// ... add other specific manual items if needed, but generating logic covers most.

generateMotors();
generateFCs();
generateESCs();

// Log count
console.log(`Generated ${db.length} parts.`);

// Write to file
fs.writeFileSync(path.join(__dirname, '../src/data/parts_db.json'), JSON.stringify(db, null, 2));
