from fastapi import FastAPI
from mpower.repository import mfi_repo as repo
from mpower.models.mDevice import mDevice
from mpower.models.device_relay_state import DeviceRelayState
from mpower.controller_models.devices import commands
import json

app = FastAPI(
   title="MPower API",
   description="An API to interact with Ubiquiti MFi MPower",
   version="1.0.0"
)   

@app.get("/api/devices", tags=["Device Management"])
async def get_devices():
   results = commands.get_all_devices()
   return results

@app.get("/api/devices/{host}", tags=["Device Management"])
async def get_device(host):   
   return commands.get_device(host)

@app.post("/api/devices", tags=["Device Management"])
async def save_device(device: mDevice):
   #payload = request.json
   return commands.add_device(device)

@app.put("/api/devices", tags=["Device Management"])
async def update_device(device: mDevice):
   #payload = request.json
   return commands.add_device(device)

@app.delete("/api/devices/{host}", tags=["Device Management"])
async def delete_device(host):
   return commands.delete_device(host)

@app.post("/api/devices/commands/{host}/{port_no}/{new_state}", tags=["Device Commands"])
async def change_relay_state(host, port_no, new_state):
   return commands.send_device_command(host, port_no, new_state)

@app.post("/api/devices/commands", tags=["Device Commands"])
async def change_device_relay_state(device_state: DeviceRelayState):
   return commands.send_device_command(device_state.host, device_state.port_no, device_state.new_state )

def run_api():
   app

if __name__ == "__main__":
   run_api()