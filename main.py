import mpower
import uvicorn
from mpower.api import controller as c

app = c.app

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0")