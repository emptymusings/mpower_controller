from pydantic import BaseModel

class DeviceRelayState(BaseModel):
    host: str
    port_no: int
    new_state: int

    def __eq__(self, compareItem):
        return self.host == compareItem.host and self.port_no == compareItem.port_no