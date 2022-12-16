#from flask import Flask, request
from flask import Flask, request
from ..repository import mfirepo as repo
from ..views.api import view
import json

api_app = Flask(__name__)

@api_app.route('/api/device/')
def get_devices():
   return view.get_all_devices()

@api_app.route('/api/device/<string:host>')
def get_device(host):
   return view.get_device(host)
   
@api_app.route('/api/device/', methods=['POST', 'PUT'])
def add_device():
   payload = request.json
   return view.add_device(payload)

@api_app.route('/api/device/<string:host>', methods=['DELETE'])
def delete_device(host):
   return view.delete_device(host)

def run_api():
   api_app.run(debug=True, host='0.0.0.0')

if __name__ == '__main__':
   print(get_devices())
