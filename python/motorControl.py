#Import Packages
import os
import json
import RPi.GPIO as GPIO
from time import sleep
import netifaces as ni
import pymongo
import pygame

#Serial Number
serial = "qaz123"

#GPIO Setup
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

#GPIO.PWM(PIN,Motor frequency)
pwdMotor1 = GPIO.PWM(22,500)
pwdMotor2 = GPIO.PWM(15,500)
pwdMotor1.start(0)
pwdMotor2.start(0)

#Get IP Address and store it into DB
ni.ifaddresses('wlan0')
ip = ni.ifaddresses('wlan0')[2][0]['addr']
print ip

#client = MongoClient()
#client = MongoClient('192.168.0.101', 27017)
#db = client['raspibot']
client = pymongo.MongoClient("mongodb://heroku_wm0zb9qc:45gok196pn30n8aiercjv0s7fr@ds033259.mlab.com:33259/heroku_wm0zb9qc")
db = client['heroku_wm0zb9qc']

db.robots.update_one({"serial":serial},{"$set":{"ip": ip}}, upsert=True)

#HTTP Server
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer

#Horn
def runHorn():
        pygame.mixer.pre_init(44100, -16, 1, 512)
        pygame.init()
        pygame.mixer.music.load("instantrapairhorn.mp3")
        pygame.mixer.music.play()

#Motor Commands
def runMotor(motorOneSpeed, motorTwoSpeed):

        if motorOneSpeed >= 0:
                GPIO.output(Motor1A,GPIO.LOW)
                GPIO.output(Motor1B,GPIO.HIGH)
        else:
                GPIO.output(Motor1A,GPIO.HIGH)
                GPIO.output(Motor1B,GPIO.LOW)

        if motorTwoSpeed >= 0:
                GPIO.output(Motor2A,GPIO.LOW)
                GPIO.output(Motor2B,GPIO.HIGH)

        else:
                GPIO.output(Motor2A,GPIO.HIGH)
                GPIO.output(Motor2B,GPIO.LOW)

        #Change duty cycle for each motor       
        pwdMotor1.ChangeDutyCycle(abs(motorOneSpeed))
        pwdMotor2.ChangeDutyCycle(abs(motorTwoSpeed))

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

    def do_HEAD(self):
        self._set_headers()

    def do_POST(self):
        content_length = int(self.headers['Content-Length']) # <--- Gets the header
        post_data = self.rfile.read(content_length) # <--- Gets the data itself
        self._set_headers()

        #Parse request and run motor function
        if len(post_data) > 0:
                obj = json.loads(post_data)
                if obj["changeMotor"] == False:
                    runHorn()
                else:
                    runMotor(obj["motorOneSpeed"], obj["motorTwoSpeed"])

        self.wfile.write("Command Received")

def run(server_class=HTTPServer, handler_class=S, port=8080):
        #Boot sound
        pygame.mixer.pre_init(44100, -16, 1, 512)
        pygame.init()
        pygame.mixer.music.load("ps1.mp3")
        pygame.mixer.music.play()

        try:
                server_address = ('', port)
                httpd = server_class(server_address, handler_class)
                print 'Starting httpd...'
                httpd.serve_forever()

        except KeyboardInterrupt:
                print ' received, shutting down the web server'

                #Reset GPIO Pins
                pwdMotor1.stop()
                pwdMotor2.stop()
                GPIO.cleanup()

                httpd.socket.close()

if __name__ == "__main__":
        from sys import argv

        if len(argv) == 2:
                run(port=int(argv[1]))
        else:
                run()