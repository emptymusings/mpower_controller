from mpower.models.mDevice import mDevice

class dbInterface():
    def connect(self):
        """Connects to the database"""
        pass

    def get_devices(self) -> []:
        """Gets all devices from the database"""
        pass

    def get_device(self, host) -> mDevice:
        """Retrieves a device from the database by its id"""
        pass

    def add_device(self, device):
        """Adds a device to the devices list"""
        pass

    def update_device(self, device):
        """Updates a device in the devices list"""
        pass

    def delete_device(self, host):
        """Removes a device in the list by its id"""
        pass

    def commit_changes(self):
        """Commits any changes made to the database"""
        pass

