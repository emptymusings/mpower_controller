import os, json
from mpower.infrastructure import storage
from mpower.infrastructure.idb import dbInterface
from mpower.models.mDevice import mDevice

class JsonDb(dbInterface):
    def __init__(self):
        self.devices = []
        self.dbFilePath = storage.get_default_devices_file()

    def connect(self):
        self.get_devices()

    def get_devices(self):
        if (len(self.devices) == 0):
            if (os.path.isfile(self.dbFilePath)):
                with open(self.dbFilePath, 'r') as db:
                    data = json.load(db)

                    for dev in data['devices']:
                        md = mDevice(name=dev['name'], host=dev['host'], username=dev['username'], password=dev['password'], save_password=dev['save_password'])
                        
                        self.devices.append(md)
        
        return self.devices

    def get_device(self, host):
        self.__verify_devices_exist()

        devs = [ds for ds in self.devices if ds.host == host]

        if (len(devs) > 0):
            return devs[0]
        else:
            return None

    def add_device(self, device):
        self.__verify_devices_exist()

        if (self.get_device(device.host) == None):
            self.devices.append(device)
            return True
        else:
            raise Exception('Cannot add the device.  A device with host {} already exists'.format(device.host))

    def update_device(self, device):
        self.__verify_devices_exist()

        d = self.get_device(device.host)
        
        if (d == None):
            raise Exception('Cannot update the device: device does not exist.')

        for i, o in self.devices:
            if o.host == device.host:
                self.devices[i] = device
                break

        return True

    def delete_device(self, host):
        self.__verify_devices_exist()

        for i, o in self.devices:
            if o.host == host:
                del self.devices[i]
                break
        
        return True

    def __verify_devices_exist(self):
        if (len(self.devices) == 0):
            self.get_devices()
            if (len(self.devices == 0)):
                raise Exception("There are no devices in the database. Operation failed")
    
    def commit_changes(self):
        devicesJson = ''

        for dev in self.devices:
            if len(devicesJson):
                devicesJson += ','

            devicesJson += json.dumps(dev.__dict__)

        devicesJson = f'"devices": [{devicesJson}]'

        with open(self.dbFilePath, 'w') as f:
            f.write('{ ' + devicesJson + ' }')
        
        return True



