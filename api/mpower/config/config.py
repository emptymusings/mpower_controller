import os, json
from appdirs import *

from mpower.infrastructure import storage
from mpower.infrastructure.idb import dbInterface
from mpower.factories.dbfactory import get_db

configFile = storage.get_config_file_path()

class Config():    
    def __init__(self): 
        self.settings = None
        self.db = {}

        self.load()
        
        if (self.settings == None):
            self.settings = {
                "database": {
                    "type": "jsondb",
                    "path": storage.get_default_devices_file()
                }
            }
        
        self.__dbSet__()

    #def __setup_config_path(self):

    def load(self):    
        if (os.path.isfile(configFile)):
            with open(configFile, 'r') as f:                
                data = json.load(f)
                self.settings = data['settings']

    def save_settings(self):
        if not os.path.isdir(storage.get_config_dir()):
            os.mkdir(storage.get_config_dir())
        
        with open(configFile, 'w+') as f:
            f.write('{ "settings": ' + str(self.settings).replace('\'','"') + ' }')

    def __dbSet__(self):
        dbType = 'jsondb'
        
        if (self.settings and 
            self.settings['database']):
            sbSettings = self.settings['database']
            dbType = sbSettings['type']
        
        self.db = get_db(dbType)
