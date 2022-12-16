import os
import os.path
from appdirs import *

APP_NAME = 'mpowerpy'
APP_AUTHOR = "lamentary"
CONFIG_FILE_NAME = "config.json"
DEVICES_FILE_NAME = 'devices.json'


def __get_settings_dir():
    site_config = site_config_dir(APP_NAME, APP_AUTHOR)
    os_config = os.path.dirname(os.path.dirname(site_config))
    app_config = os.path.join(os_config, APP_NAME)
    return app_config
    
def get_config_dir():
    app_config = __get_settings_dir()
    return os.path.join(app_config)

def get_config_file_path():
    return os.path.join(get_config_dir(), CONFIG_FILE_NAME)

def get_default_devices_file():
    return os.path.join(get_config_dir(), DEVICES_FILE_NAME)

