class MfiRepository(object):
    def __init__(self, db):
        self.db = db

    def get_all(self):
        """Loads devices list from the database"""
        return self.db.get_devices()
    
    def get(self, host):
        """Gets a single device from the databse"""
        return self.db.get_device(host)
    
    def add_device(self, device):
        """Adds a device to the devices in database"""
        try:
            self.db.add_device(device)        
            return {"results" : "success"}
        except Exception as ex:
            return {"results": "failed", "reason" : ex}
        
    def update_device(self, device):
        """Updates a device in the devices database"""
        self.db.update_device(device)

    def delete_device(self, device):
        """Removes a device from the devices database"""
        self.db.delete_device(device.host)

    def commit_changes(self):
        self.db.commit_changes()
