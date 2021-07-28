# Dict -> JSON -> Protobuf

import time, datetime, json
from google.protobuf.json_format import Parse
from msg_pb2 import Msg

starttime = time.time()
id = 1
durasi = 0 #durasinya
suhu = 25
batas_durasi = 200
batas_suhu = 35

database = {
    "id" : id,
    "timestamp" : 0,
    "suhu" : suhu
}

while True:
   # print("id : ", id , "|", "timestmp :", datetime.datetime.now().replace(microsecond=0), "|", "Sensor :", suhu)
   database["id"] = id
   database["timestamp"] = str(datetime.datetime.now().replace(microsecond=0))
   database["suhu"] = suhu
   # print(database) # dict

   jsonn = json.dumps(database)

   # print(jsonn) #JSON 
   message = Parse(jsonn, Msg())
   print(message.id, " ", message.timestamp, " ", message.suhu) #protobuf
   
   time.sleep(2)
   id += 1
   durasi +=2
   suhu += 1

   if suhu >= batas_suhu + 1:
       suhu = 25
   if durasi >= batas_durasi: #penentuan batas waktu
       break