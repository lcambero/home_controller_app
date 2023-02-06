'''
Configuration file for the water_flow_sensor.
'''

# Namespace of the webapp for the water flow sensor module
WATER_FLOW_SENSOR_NAMESPACE:str = '/water-flow-sensor'

# Raspberry Pi GPIO pin number for the water flow sensor
WATER_FLOW_SENSOR_PIN:int = 4

# Raspberry Pi GPIO pin number for the main water valve
MAIN_WATER_VALVE_PIN:int = 5

# Raspberry Pi GPIO pin number for the electricity signal
ELECTRICITY_SIGNAL_PIN:int = 6

# Measure the water flow per second (Hz)
WATER_FLOW_SENSOR_MEASUREMENT_FREQUENCY:float = 1 / 30