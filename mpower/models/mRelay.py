from pydantic import BaseModel

class mRelay(BaseModel):
    port: int
    id: str
    label: str
    model: str
    output: int
    power: float
    enabled: int
    current: float
    voltage: float
    powerfactor: float
    relay: int
    lock: int
    relay_number: int

