import time, datetime, msg_pb2
import paho.mqtt.client as mqtt

# The callback for when the client receives a CONNACK response from the server.
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected successfully")
    else:
        print("Connect returned result code: " + str(rc))

# The callback for when a PUBLISH message is received from the server.
def on_message(client, userdata, msg):
    print("Received message: " + msg.topic + " -> " + msg.payload.decode("utf-8"))

# create the client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# enable TLS
client.tls_set(tls_version=mqtt.ssl.PROTOCOL_TLS)

# set username and password
client.username_pw_set("jeko562", "Ando!997")

# connect to HiveMQ Cloud on port 8883
client.connect("c242f3f8335f467a8f2a0edd82b5ab74.s2.eu.hivemq.cloud", 8883)

starttime = time.time()
id = 1
durasi = 0 #durasinya
suhu = 25
batas_durasi = 200
batas_suhu = 35

database = msg_pb2.Msg()
database.id = id
database.timestamp = "tidak ada data"
database.suhu = suhu


while True:
   database.timestamp = str(datetime.datetime.now().replace(microsecond=0))
   # print(database.SerializeToString()) #cek serialize protobuf
   # publish to the topic "alat/sensor/latest"
   client.publish("alat/sensor/latest", database.SerializeToString())
#    print('durasi:', durasi) cek program
   time.sleep(2)
   database.id += 1
   durasi +=2
   database.suhu += 1

   if database.suhu >= batas_suhu + 1:
       database.suhu = 25
   if durasi >= batas_durasi: #penentuan batas waktu
       break

client.disconnect()

# Blocking call that processes network traffic, dispatches callbacks and handles reconnecting.
# client.loop_forever()