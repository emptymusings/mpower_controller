from .webrequest import Requester
from .telnetclient import TelNetter
import getpass
import json
import time

def connect_to_device(host, username, password):
    return Requester(host, username, password)

def get_device(connection, relay_no = 0):
    return connection.get_general_info(relay_no)

def change_relay_state(connection, relay_no = 1, new_state = 0):
    return connection.change_relay_state(relay_no, new_state)

