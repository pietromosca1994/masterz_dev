from fastapi import FastAPI
from mangum import Mangum
from datetime import datetime
from random import random

SEED=1234

SOC_DEC=2
SOH_DEC=2
V_DEC=2
FEC_DEC=2

class Battery:
    def __init__(self):
        return 
    
    def getState(self, uuid: str):
        res={
            'SOC':    self._getSOC(uuid),
            'SOH':    self._getSOH(uuid),
            'V':      self._getV(uuid),
            'FEC':    self._getFEC(uuid),
            'timestamp': self._getTimestamp()
        }
        return res
    
    @staticmethod
    def sampleRandom(low: float, high:float):
        if high<low:
            return ValueError("low must be lower than high")
        return low+(high-low)*random()
    
    def _getSOC(self, uuid: str)->float:
        SOC=self.sampleRandom(low=0.0, high=1.0)
        return SOC
    
    def _getSOH(self, uuid: str)->float:
        SOH=self.sampleRandom(low=0.0, high=1.0)
        SOH=50.293
        return SOH
    
    def _getV(self, uuid: str)->float:
        V=self.sampleRandom(low=0.0, high=400.0)
        return V
    
    def _getFEC(self, uuid: str)->int:
        FEC=self.sampleRandom(low=0.0, high=5.0)
        return FEC

    def _getTimestamp(self)->int:
        timestamp=int(datetime.now().timestamp())
        return timestamp
    

app = FastAPI()
handler = Mangum(app=app)

@app.get("/getState/{uuid}")
async def getState(uuid: str):
    battery=Battery()
    return battery.getState(uuid)

@app.get("/getState/SOC/{uuid}")
async def getStateSOC(uuid: str):
    battery=Battery()
    state={"SOC": battery._getSOC(uuid)}
    return state

@app.get("/getState/SOH/{uuid}")
async def getStateSOH(uuid: str):
    battery=Battery()
    state={"SOH": battery._getSOH(uuid)}
    return state

@app.get("/getState/V/{uuid}")
async def getStateV(uuid: str):
    battery=Battery()
    state={"V": battery._getV(uuid)}
    return state

@app.get("/getState/FEC/{uuid}")
async def getStateFEC(uuid: str):
    battery=Battery()
    state={"FEC": battery._getFEC(uuid)}
    return state