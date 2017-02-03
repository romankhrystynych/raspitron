""" Scheduler functions """
import schedule
import time
from time import gmtime, strftime
from threading import Thread

class Scheduler(Thread):
    """ Scheduler Thread Class """
    def __init__(self, PINS, GPIO):
        Thread.__init__(self)
        self.pins = PINS
        self.gpio = GPIO
        self.daemon = True

    def job(self, pin_number, action_time, set_to):
        """ Scheduler Job """
        sched_str = 'Scheduled Action --- ' + action_time
        sched_str += ' set pin #' + str(pin_number) + ' to ' + str(set_to)
        print sched_str

        if self.gpio is not None:
            self.gpio.output(pin_number, self.gpio.HIGH if set_to else self.gpio.LOW)

    def run(self):
        """ Function for schedule """
        schedule.clear()
        for _pin in self.pins:
            if len(_pin['rules']) > 0:
                for rule in _pin['rules']:
                    _num = _pin['number']
                    _time = rule['time']
                    _set = rule['setTo']
                    schedule.every().day.at(_time).do(self.job, _num, _time, _set)

        while True:
            schedule.run_pending()
            time.sleep(1)