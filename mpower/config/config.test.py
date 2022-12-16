from config import Config
import os

config = Config()

def load():
    print()
    print('Loading Config')
    config.load()
    print("Config loaded: {}".format(config.__dict__))
    print()

def create():
    print()
    print("Creating settings")
    config.settings = {}
    db = {"database": get_database_dict()}
    config.settings.update(db)
    config.save()
    print("Settings saved")
    print()

def update_entry(key, value1, value2):
    print()
    print("Adding value to Config")
    config.settings.update( {key : value1 } )
    config.save()
    print("New settings: {}".format(config.__dict__))
    print("Changing value in Config")
    config.settings.update( {key : value2 })
    config.save()
    print("Updated settings: {}".format(config.__dict__))

def remove_entry(key):
    print()
    print("Removing value")
    del config.settings[key]
    config.save()
    print("Updated settings: {}".format(config.__dict__))
    
def get_database_dict():
    dirname = os.path.dirname(__file__)

    return {
        "type": "jsondb",
        "path": os.path.join(dirname,"infrastructure","database.json")
    }

if (__name__ == '__main__'):
    create()
    load()    
    update_entry("color", "blue", "green")
    remove_entry("color")

