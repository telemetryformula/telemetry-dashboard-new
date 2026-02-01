import serial
import redis
import re
import cantools
import json
import argparse
import time

parser = argparse.ArgumentParser("serial_to_redis")
parser.add_argument("--serial_ports", nargs='*', help="The possible device ports your are attempting to connect to", default=['/dev/ttyACM0', '/dev/ttyACM1', '/dev/ttyUSB0', '/dev/ttyUSB1'])
parser.add_argument("--baud_rate", nargs='?', help="The baud rate of the device you are attempting to read from", default=115200)
parser.add_argument("--redis_host", nargs='?', help="The Redis host you are attempting to connect to", default='localhost')
parser.add_argument("--redis_host_port", nargs='?', help="The Redis hosts port you are attempting to connect to", default='6379')
parser.add_argument("--redis_channel", nargs='?', help="The Redis channel you attempting to publish to", default='can')
parser.add_argument("--DBC_file_path", nargs='?', help="The DBC file to parse your serial messages with", default="./production.dbc")
parser.add_argument("--mock_file_path", nargs="?", help="File you would like to read in inplace of serial device (used for testing)")

program_args = parser.parse_args()

db = cantools.database.load_file(program_args.DBC_file_path)

redis_client = redis.StrictRedis(host=program_args.redis_host, port=int(program_args.redis_host_port), decode_responses=True)

# Signals expected by the GraphQL subscription (from graphqloperation.txt)
GRAPHQL_SIGNALS = [
    'Front_Brake_Pressure', 'Rear_Break_Pressure', 'Throttle_Pos_Primary', 'Throttle_Pos_Secondary',
    'FR_Wheel_Speed', 'FL_Wheel_Speed', 'RR_Wheel_Speed', 'RL_Wheel_Speed',
    'Steering_Pot_Primary', 'Steering_Pot_Secondary', 'Motor_One_Cooling_Loop_Temp_Out',
    'Motor_One_Cooling_Loop_Temp_In', 'Motor_Two_Cooling_Loop_Temp_Out', 'Motor_Two_Cooling_Loop_Temp_In',
    'Inverter_Cooling_Loop_Temp_Out', 'Inverter_Cooling_Loop_Temp_In', 'Gearbox_One_Temp', 'Gearbox_Two_Temp',
    'Front_IMU_Lateral_Accel', 'Front_IMU_Long_Accel', 'Front_IMU_Vert_Accel', 'Front_IMU_Yaw_Rotate',
    'Front_IMU_Pitch_Rotate', 'Front_IMU_Roll_Rotate', 'Inv_One_Status_Word', 'Inv_One_Actual_Speed',
    'Inv_One_Actual_Torque_Current', 'Inv_One_Actual_Magnetizing_Current', 'Inv_Two_Status_Word',
    'Inv_Two_Actual_Speed_Value', 'Inv_Two_Torque_Current', 'Inv_Two_Actual_Magnetizing_Current',
    'Pack_Current', 'Pack_Inst_Voltage', 'Pack_SOC', 'Relay_State', 'Pack_DCL', 'Pack_CCL',
    'Lowest_Temp', 'Highest_Temp', 'Low_Cell_ID', 'High_Cell_ID', 'Low_Termistor_ID', 'High_Thermistor_ID',
    'Internal_Temp', 'Average_Temp', 'Pack_Health', 'DTC_Flags_One', 'DTC_Flags_Two', 'Current_Limit_Status',
    'Ready_To_Drive_Input', 'Ready_To_Drive_Arm_Inverters', 'Traction_Control_Setting',
    'Torque_Vectoring_Low_Setting', 'Torque_Vectoring_High_Setting', 'Low_Cell_Voltage', 'High_Cell_Voltage',
    # second block
    'Steered_Angle', 'Lap_GainLoss_Running', 'Lap_GainLoss_Final', 'Log_Time_Remaining',
    'FL_Rotor_Temp_2', 'FR_Rotor_Temp_2', 'RL_Rotor_Temp_2', 'RR_Rotor_Temp_2',
    'Exhaust_Temperature_Cylinder1', 'Exhaust_Temperature_Cylinder2', 'Exhaust_Temperature_Cylinder3',
    'Exhaust_Temperature_Cylinder4'
]

# Maintain a combined CAN state to match GraphQL subscription shape
can_state = {k: 0 for k in GRAPHQL_SIGNALS}

for port in program_args.serial_ports:
    try:
        ser = serial.Serial(port, baudrate=program_args.baud_rate)
        print(f"Connected to device on {port}")
        break
    except serial.SerialException:
        print(f"Failed to connect to {port}")


def read_file_infinite(file_path):
    while True:
        with open(file_path, "r") as file:
            for line in file:
                yield line.strip()


if 'ser' not in locals() and program_args.mock_file_path is None:
    print("Failed to connect to any serial device")
else:
    index = 0
    if program_args.mock_file_path is not None:
        line_generator = read_file_infinite(program_args.mock_file_path)
    try:
        while True:
            if program_args.mock_file_path is None:
                line = ser.readline()  # Read a line from the serial port
                decoded_line = line.decode('utf-8').strip()
            else:
                time.sleep(0.01)
                decoded_line = next(line_generator)
            if decoded_line.startswith("Message ID:"):
                pattern = r'Message ID: (\d+), Data: (0x[0-9a-fA-F]{1,16}$)'

                match = re.match(pattern, decoded_line)

                if match:
                    try:
                        data = db.decode_message(int(match.group(1)), bytes.fromhex(match.group(2)[2:]))
                        # Update can_state only for keys that match the GraphQL subscription
                        for sig, val in data.items():
                            if sig in can_state:
                                can_state[sig] = val
                        # Publish the combined CAN state so the GraphQL subscriber receives a single object
                        redis_client.publish(program_args.redis_channel, json.dumps(can_state))
                    except Exception as e:
                        print(e)
                if index > 10000:
                    ser.reset_input_buffer()
                    index = 0
                
    except KeyboardInterrupt:
        ser.close()  # Close the serial port when the program is interrupted
