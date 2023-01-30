from fastapi import FastAPI
from mpower.repository import mfirepo as repo
from mpower.views.api_views import view

__all__=[
   'repo',
   'view'
]

app = FastAPI()

@app.get("/api/devices")
async def get_devices():
   return view.get_all_devices()

@app.get("/api/devices/{host}")
async def get_device(host):
   return view.get_device(host)

@app.post("/api/devices")
async def save_device():
   #payload = request.json
   return {"results": "added - stub"}

@app.put("/api/devices")
async def update_device():
   #payload = request.json
   return view.add_device({"results": "updated - stub"})

@app.delete("/api/delete/{host}")
async def delete_device(host):
   return view.delete_device(host)

def run_api():
   app

if __name__ == "__main__":
   run_api()
