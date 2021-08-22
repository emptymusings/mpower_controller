import mpower.repository.mfi_repo as repo
from mpower.models.mDevice import mDevice
from mpower.comm import webrequest
import json

def get_all_devices():
    devices = repo.get_all_devices()
    print(devices)
    results = json_results(False, devices)
    return results

def get_device(host):
    device = repo.get_device(host) 

    if (device is None):
        results = json_results(True,'Device not found.  Verify the host address you are using and try again')
    else:
        results = json_results(False, device)

    return results

def add_device(device: mDevice):
    results = repo.save_device(device)
    
    if ('Error' in results):
        return json_results(True, results)
    
    return json_results(False, results)

def send_device_command(host, relay: int, new_state: int):
    device = repo.get_device_full(host).dict()

    if device is None:
        return json_results(True,'Device not found.  Verify the host address you are using and try again')

    relay_exists = False

    for r in device['relays']:
        if r['port'] == int(relay):
            relay_exists = True
            break
    
    if not relay_exists:
        return json_results(True, f'Relay {relay} does not exist on host {host}.')

    connection = webrequest.Requester(host, device['username'], device['password'])
    connection.change_relay_state(relay, new_state)
    return get_device(host)
    

def delete_device(host):
    result = repo.delete_device(host)

    if ('Error' in result):
        return json_results(True, result)
    else:
        return json_results(False, result)

def json_results(is_error, values):
    if (is_error == False):
        results = results_value(values)
        return results
    else:
        return json.dumps(error(values))
    

def results_value(values):
    return {
        "results": "success",
        "data": values
    }

def error(message):
    return {
        "results": "failed", 
        "error_reason": message
        }
