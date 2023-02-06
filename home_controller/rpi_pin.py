# -*- coding: utf-8 -*-
"""
Raspberry Pi pin class
"""
from RPi import GPIO # pylint: disable=import-error
GPIO.setmode(GPIO.BCM)

# from home_controller import utils

# TRUE if the app is running on a Raspberry Pi, FALSE otherwise
# RPI_ENV:bool = utils.read_env_varaible('RPI_ENV', default='FALSE') == 'TRUE'

# Number of BCM pins on a Raspberry Pi 4
N_PINS:int = 27

# if RPI_ENV:
#     from RPi import GPIO # pylint: disable=import-error
# else:
#     # from RPiSim.GPIO import GPIO # pylint: disable=import-error
#     import RPi.GPIO as GPIO # pylint: disable=import-error



class RpiPin():
    '''
    Raspberry Pi pin class
    '''
    def __init__(self, pin:int, setup:bool) -> None:
        """
        Example function with types documented in the docstring.

        `PEP 484`_ type annotations are supported. If attribute, parameter, and
        return types are annotated according to `PEP 484`_, they do not need to be
        included in the docstring:

        Parameters
        ----------
        pins : dict
            Dictionary of pins, where the key is the pin id and the value is the pin activation.
            {pin1: activation_pin1, pin2: activation_pin2, ...}
        """
        assert(isinstance(pin, int) and 1 <= pin <= N_PINS)
        assert isinstance(setup, bool)

        self.pin = pin
        self.setup = GPIO.OUT if setup else GPIO.IN
        self.activated = GPIO.LOW

    def __str__(self) -> str:
        '''
        Return a string representation of the pin
        '''
        return f'''
                RPI pin {self.pin} configured as {self.setup}, 
                is activated: {self.activated} (BCM board mode)
                '''

    def __repr__(self) -> str:
        '''
        Return a string representation of the pin
        '''
        return self.__str__()

    def activate(self) -> None:
        '''
        Activate pin, by setting pin to HIGH
        '''
        self.activated = GPIO.HIGH
        GPIO.setup(self.pin, self.setup)
        GPIO.output(self.pin, self.activated)

        # utils.logging(
        #     f'RPI pin {self.pin} activated',
        #     source='home_controller/rpi_pin/activate',
        #     source_module='home_controller'
        #     )

    def deactivate(self) -> None:
        '''
        Deactivate pin, by setting pin to LOW
        '''
        self.activated = GPIO.LOW
        GPIO.setup(self.pin, self.setup)
        GPIO.output(self.pin, self.activated)

        # utils.logging(
        #     f'RPI pin {self.pin} deactivated',
        #     source='home_controller/rpi_pin/deactivate',
        #     source_module='home_controller'
        #     )