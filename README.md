# Challenge IOT Engineer Intern di Bluebird Group

## Objective : Build full stack IoT dashboard for an emulated thermostat monitoring.

## Deliverables :

#### \*REST Webservices back-end (Built in Go)

    a. Consume MQTT Topics from broker (hivemq)
    b. Decode raw data (encoded with protobuf)
    c. Store latest, min, max in memory

#### \*Front-end Web monitoring (React.JS)

    a. Pool every 3 seconds to get data from backend
    b. Display latest data with indicator green if temp <= 30 degrees C and red if temp > 30 degrees C
    c. Display minimum and maximum recorded data

#### \*Console application (emulated thermostat) with Python

    a. Sending Incremental value 25 -35 degree to MQTT broker every 2 seconds
    b. The payload consist id, timestamp, and temp
    c. The payload encoded by protobuf

## Workflow

    1. Termostat Emulator (built in Python) as MQTT Client send encoded (by protobuf) temp value to MQTT server
    2. Webservice (built in Go) as MQTT Client decoded temp value, then store the latest, min, and max data in memory. Build the API.
    3. Web dashboard pool every 3 seconds get data from the API, and then display the data with indicator.

## Progress (6/6)

    1. Build Termostat Emulator using PyThon (done)
    2. The Emulator send encoded data to the MQTT Server (done)
    3. The Webservice receive encoded data from MQTT Server (done)
    4. The webservice decode the data (done)
    5. The web service store data to web with API
    6. Build Web dashboard for display data

## Documentation

### go.mod

    A module is a collection of Go packages stored in a file tree with a go.mod file at its root. The go.mod file defines the module’s module path, which is also the import path used for the root directory, and its dependency requirements, which are the other modules needed for a successful build. Each dependency requirement is written as a module path and a specific semantic version.

### go.sum

    This file lists down the checksum of direct and indirect dependency required along with the version. It is to be mentioned that the go.mod file is enough for a successful build. They why go.sum file is needed?. The checksum present in go.sum file is used to validate the checksum of each of direct and indirect dependency to confirm that none of them has been modified.

### Main_yuk.py

    Unnecessary program tbh. but sayang untuk dibuang. Initially, its a backup file when im develop the program.

### Main.py

    The Thermostat Emulator. run this code, this program will sending data to the MQTT

### msg_pb2.py

    Compiled proto file in python. Needed when going to encode the payload.

### main.go

    The webservice code. This program is not finished yet. But it can be run to display the decoded data

### msg.pb.go

    Compiled proto file in Go. Needed when going to decode the payload

### msg.proto

    Proto file before compiled.

### web-app

    React.JS based website for monitoring

## How to demo

    1. run main.go and msg.pb.go
    2. run Main.py
    3. run web-app
