from pydantic import BaseModel
class mDevice(BaseModel):
    name: str
    host: str
    username: str
    password: str
    save_password: bool
    relays: list = None
        
    def __eq__(self, compareItem):
        return self.host == compareItem.host

    

