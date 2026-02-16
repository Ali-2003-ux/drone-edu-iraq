# Drone Design Principles: Frames & Propulsion

Building a drone starts with a mission. Are you building a cinematic cruiser, a high-speed racer, or a heavy-lift agricultural workhorse? The answers define your frame and propulsion choices.

## 1. Frame Size (Wheelbase) & Propeller Selection

The "Wheelbase" of a drone frames is the diagonal distance from motor hub to motor hub, measured in millimeters. This dimension dictates the maximum propeller size you can use, which in turn defines the drone's character.

| Wheelbase (mm) | Description | Typical Prop Size | Application |
| :--- | :--- | :--- | :--- |
| **65mm - 85mm** | Tiny Whoop | 31mm - 40mm | Indoor flying, micro FPV |
| **100mm - 150mm** | Toothpick / Micro | 2" - 3" | Park flying, quiet racing |
| **200mm - 250mm** | 5-Inch Standard | 5" - 5.1" | Freestyle, FPV Racing (The standard) |
| **280mm - 350mm** | 7-Inch Long Range | 7" | Long-range mountain surfing |
| **450mm+** | Heavy Lift | 10" - 15" | Photography (Cinelifter), Agriculture |

> **Rule of Thumb**: Larger props are more efficient (g/W) but react slower. Smaller props are less efficient but offer snappy, responsive control.

## 2. Thrust-to-Weight Ratio (TWR)

The single most important metric for performance is the Thrust-to-Weight Ratio. It determines how your drone "feels" in the air.

The mathematical formula is:

$$ TWR = \frac{\text{Total Thrust (All Motors)}}{\text{Total Weight (All Up Weight)}} $$

### How to Calculate
1.  **Find Motor Thrust**: Look at the manufacturer's thrust data table for your chosen voltage (e.g., 4S or 6S) and prop size. Note the "Max Thrust" in grams.
2.  **Multiply**: $ \text{Total Thrust} = \text{Motor Thrust} \times 4 $ (for a quadcopter).
3.  **Weigh Everything**: Estimate the "All Up Weight" (AUW), including the heavy LiPo battery and GoPro.

### TWR Guidelines

*   **2:1 (Hover/Cinematic)**: A ratio of 2:1 is the bare minimum for safe flight. It allows the drone to hover at 50% throttle. This is ideal for stable aerial photography platforms like DJI Mavics or custom cinematic rigs where smoothness is paramount.
*   **4:1 to 5:1 (Freestyle/Racing)**: For FPV racing, you need explosive power. A 5:1 ratio means the drone can accelerate specifically against gravity at 4G! This allows for punch-outs, sharp cornering recovery, and "hanging" in the air during acrobatic maneuvers.
*   **10:1+ (Extreme)**: Professional drag racing drones. Uncontrollable for beginners.

## 3. Frame Materials

The skeleton of your UAV needs to handle vibration, crashes, and torque.

| Material | Pros | Cons | Best For |
| :--- | :--- | :--- | :--- |
| **Carbon Fiber** | Highest strength-to-weight ratio. Stiff (good for tuning). Conductive (watch out for shorts!). | Expensive. Blocks RF signals (Radio/Video) if antennas are blocked. | **Standard for 99% of FPV drones**. |
| **Aluminum** | Cheap, easy to work with. Acts as a heatsink. | Bends easily in crashes (unlike Carbon which snaps or stays true). Heavy. | Basic camera drone arms, large folding frames. |
| **3D Printed (PLA/PETG)** | Rapid prototyping. Infinite shapes. Cheap replacement. | Heavy for its strength. "Jello" vibrations in video due to flex. Melts in hot cars (PLA). | Micro drones, prototyping, experimental shapes. |
| **Injection Molded Plastic** | Extremely durable (elastic). Cheap mass production. | High initial mold cost. Flexes under high power. | Tiny Whoops, DJI consumer drones. |

## Summary
To design a successful drone:
1.  **Pick a Prop Size**: Based on your goal (5" for freestyle, 3" for parks).
2.  **Pick a Frame**: That fits those props.
3.  **Select Motors**: That can spin those props at your desired RPM.
4.  **Check TWR**: Ensure your total thrust is at least 2x your total weight.
