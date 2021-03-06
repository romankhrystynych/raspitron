""" Index server file with GPIO Pins """

from flask import Flask, render_template, request, jsonify
import RPi.GPIO as GPIO

APP = Flask(__name__)

GPIO.setmode(GPIO.BCM)

# Create a dictionary called pins to store the pin number, name, and pin state:
PINS = [
    {
        'number': 4,
        'name': 'Light',
        'state': GPIO.LOW
    },
    {
        'number': 14,
        'name': 'Fan',
        'state': GPIO.LOW
    }
]

# Set each pin as an output and make it low:
for _pin in PINS:
    GPIO.setup(_pin['number'], GPIO.OUT)
    GPIO.output(_pin['number'], GPIO.LOW)

@APP.route("/status", methods=['GET'])
def status():
    """ Get pin status template """
    # For each pin, read the pin state and store it in the pins dictionary:
    for pin in PINS:
        pin_number = int(pin['number'])
        pin['state'] = GPIO.input(pin_number)
    # Put the pin dictionary into the template data dictionary:
    json_data = {
        'pins' : PINS
    }
    # Pass the template data into the template main.html and return it to the user
    return jsonify(**json_data)

@APP.route("/status/<pin_number>/<pin_action>", methods=['POST'])
def status_post(pin_number, pin_action):
    """ Change pin status template """
    pin_number = int(pin_number)
    if pin_action == "on":
        GPIO.output(pin_number, GPIO.HIGH)
    if pin_action == "off":
        GPIO.output(pin_number, GPIO.LOW)

    for pin in PINS:
        pin['state'] = GPIO.input(pin['number'])

    json_data = {
        'pins' : PINS
    }

    return jsonify(**json_data)

if __name__ == "__main__":
    APP.run(host='0.0.0.0', port=80, debug=True)
