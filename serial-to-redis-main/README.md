# Serial to Redis

## Overview

`serial_to_redis` is a Python script that reads CAN messages from a serial port or a mock file, decodes them using a DBC (Database CAN) file, and publishes the decoded messages to a Redis channel. This script is useful for monitoring CAN bus data and integrating it with systems that use Redis for data distribution.

## Features

- **Connect to Serial Ports**: Connects to multiple serial ports to find an available device.
- **Read from Serial or Mock File**: Reads data either from a real serial device or a mock file for testing purposes.
- **Decode CAN Messages**: Uses a DBC file to decode CAN messages.
- **Publish to Redis**: Publishes decoded messages to a specified Redis channel.
- **Configurable**: All settings are configurable via command-line arguments.

## Prerequisites

- Python 3.x
- Required Python packages:
  - `pyserial`
  - `redis`
  - `cantools`
  - `json` (standard library)
  - `argparse` (standard library)
  - `re` (standard library)

You can install the required packages using pip:

```sh
pip install pyserial redis cantools
```

## Usage

To run the script, use the following command line syntax:

```sh
python serial_to_redis.py [OPTIONS]
```

### Command-line Arguments

- `--serial_ports`: List of serial ports to attempt to connect to. Default is `['/dev/ttyACM0', '/dev/ttyACM1', '/dev/ttyUSB0', '/dev/ttyUSB1']`.
- `--baud_rate`: Baud rate of the serial device. Default is `115200`.
- `--redis_host`: Host of the Redis server. Default is `localhost`.
- `--redis_host_port`: Port of the Redis server. Default is `6379`.
- `--redis_channel`: Redis channel to publish messages to. Default is `can`.
- `--DBC_file_path`: Path to the DBC file used for decoding CAN messages. Default is `./production.dbc`.
- `--mock_file_path`: Path to a file for mock data (used for testing). If not specified, the script will attempt to read from a serial device.

### Example

To read from a serial device and publish to Redis:

```sh
python serial_to_redis.py --serial_ports /dev/ttyACM0 /dev/ttyUSB0 --baud_rate 9600 --redis_channel can_data --DBC_file_path ./my_database.dbc
```

To read from a mock file:

```sh
python serial_to_redis.py --mock_file_path ./mock_data.txt --redis_channel test_channel
```

## Code Explanation

1. **Argument Parsing**: Parses command-line arguments for configuration.
2. **DBC File Loading**: Loads the DBC file for message decoding.
3. **Redis Client Initialization**: Initializes connection to the Redis server.
4. **Serial Port Connection**: Tries to connect to available serial ports.
5. **Read Loop**:
   - Reads lines from the serial port or mock file.
   - Decodes CAN messages based on DBC file.
   - Publishes the decoded messages to the specified Redis channel.
6. **Error Handling**: Handles connection issues and exceptions during message decoding.

## Error Handling

- If no serial device is connected and no mock file is provided, the script will terminate with an error message.
- Handles `KeyboardInterrupt` to close the serial port cleanly upon interruption.

## License

This script is released under the MIT License. See the `LICENSE` file for details.

## Author

Cedric Le Denmat

Feel free to modify and adapt this script to fit your specific needs. If you encounter any issues or have suggestions for improvements, please contribute to the project or contact the author.