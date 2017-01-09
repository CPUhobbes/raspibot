#GPIO Setup
import json
import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BOARD)

Motor1A = 16
Motor1B = 18
Motor1E = 22

Motor2A = 11
Motor2B = 13
Motor2E = 15

GPIO.setup(Motor1A,GPIO.OUT)
GPIO.setup(Motor1B,GPIO.OUT)
GPIO.setup(Motor1E,GPIO.OUT)

GPIO.setup(Motor2A,GPIO.OUT)
GPIO.setup(Motor2B,GPIO.OUT)
GPIO.setup(Motor2E,GPIO.OUT)

GPIO.output(Motor1A,GPIO.HIGH)
GPIO.output(Motor1B,GPIO.LOW)

GPIO.output(Motor2A,GPIO.HIGH)
GPIO.output(Motor2B,GPIO.LOW)

pwdMotor1 = GPIO.PWM(22,25)
pwdMotor2 = GPIO.PWM(15,25)

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

def runMotor(motorNum, speed):

        print(motorNum, speed)
        if motorNum == 1:
                if speed == 0:
                        pwdMotor1.stop(0)
                else:
                        pwdMotor1.start(speed)
        elif motorNum == 2:
                if speed == 0:
                        pwdMotor2.stop(0)
				else:
                        pwdMotor2.start(speed)

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.send_header("Access-Control-Allow-Origin", "*");
        self.send_header("Access-Control-Expose-Headers", "Access-Control-Allow-Origin");
        self.send_header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        self.end_headers()

    def do_GET(self):
        #self._set_headers()
        #Send jpg from web cam
        self.send_response(200)
        self.send_header('Content-type','image/jpg')
        self.end_headers()
        f = open('/dev/shm/mjpeg/cam.jpg')
        self.wfile.write(f.read())
        f.close()
        #self.wfile.write("<html><body><h1>hi!</h1></body></html>")
	def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the si$
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        self._set_headers()
        print post_data

        #Parse request and run motor function
        if len(post_data) > 0:
                #motorData = post_data.split('&')
                #motorNum = motorData[0].split('=')
                #speed = motorData[1].split('=')
                obj = json.loads(post_data)
                runMotor(obj["motorNum"], obj["speed"])
                #runMotor(motorNum[1],speed[1])

        self.wfile.write("Command Received")

def run(server_class=HTTPServer, handler_class=S, port=8080):

    try:
    	server_address = ('', port)
        httpd = server_class(server_address, handler_class)
        print 'Starting httpd...'
        httpd.serve_forever()

    except KeyboardInterrupt:
        print ' received, shutting down the web server'

        #Reset GPIO Pins
        GPIO.cleanup()

        httpd.socket.close()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()


