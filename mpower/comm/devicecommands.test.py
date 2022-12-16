import devicecontrols as dc
from mDevice import mDevice
from pydantic import BaseModel

dev = mDevice

c = dc.connect_to_device("192.168.1.217", "admin", "10rumncokes")

print()
    
def get_single_relay_status(relay_no):
    print()
    print("Getting relay status for {}".format(relay_no))
    state = dc.get_device(c, relay_no)
    print("Status Result")
    print(state)
    print()
    return state

def get_device():
    print()
    print("Getting Device")
    d = dc.get_device(c)
    print(d)
    
def change_relay_state(relay_no = 1, state = 0):
    print()
    
    if state == 0:
        state_text = "Off"
    else:
        state_text = "On"

    print("Changing relay {0} to: {1}".format(relay_no, state_text))
    results = dc.change_relay_state(c, relay_no, state)
    print(results)

if (__name__ == '__main__'):
    get_single_relay_status(1)
    get_device()
    change_relay_state(1,0)
    change_relay_state(1,1)

