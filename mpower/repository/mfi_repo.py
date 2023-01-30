from mpower.models.mDevice import mDevice
from mpower.config import config as cfg
from mpower.comm import webrequest
from mpower.infrastructure import storage
import json, os

config = cfg.Config()
config.load()
db = config.db

if not os.path.isfile(storage.get_config_file_path()):
    config.save_settings()

def get_all_devices():  
    results = []
    print('{0} devices loaded.'.format(len(db.devices)))

    if (db.devices is None or len(db.devices) == 0):
        db.get_devices()

    for device in db.devices:
        print('Getting information for "{}"'.format(device.name))
        mp = mDevice(name=device.name, host=device.host, username=device.username, password=device.password, save_password=device.save_password)

        if (mp.relays is None or len(mp.relays) == 0):
            results.append(mp.dict(exclude={'password','username','relays', 'save_password'}))
        else:
            results.append(mp.dict(exclude={'password','username','save_password'}))
            
    return results

def get_device(host):
    device = get_device_full(host)
    
    results = device.dict(exclude={'password','username','save_password'})
    return results


def get_device_full(host):
    db.get_devices()
    matches = [dev for dev in db.devices if dev.host == host]

    if (len(matches) == 0):
        return None

    device = matches[0]
    webReq = webrequest.Requester(device.host, device.username, device.password)
    info = webReq.get_general_info()
    response = json.loads(info)
    device.relays = response['sensors']

    return device

def save_device(device):
    matches = [dev for dev in db.devices if dev.host == device.host]

    if len(matches) > 0:
        idx = db.devices.index(matches[0])
        db.devices[idx] = device
    else:
        db.devices.append(device)

    db.commit_changes()
    
    return 'Device with host \'{}\' saved'.format(device.host)

def delete_device(host):
    matches = [dev for dev in db.devices if dev.host == host]

    if (len(matches) == 0):
        return 'Error: Device with host \'{}\' not found'.format(host)
    
    idx = db.devices.index(matches[0])
    db.devices.pop(idx)
    db.commit_changes()
    return 'Device with host \'{}\' removed'.format(host)
