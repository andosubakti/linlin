package main

import (
	"fmt"
	//import the Paho Go MQTT library
	"log"
	"os"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/golang/protobuf/proto"
)

//define a function for the default message handler
var callback mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {

	// print raw (encoded) data
	// fmt.Printf("TOPIC: %s\n", msg.Topic())
	// fmt.Printf("MSG: %s\n", msg.Payload())

	//Decode Protobuf
	decodedData := &Msg{}
	err := proto.Unmarshal(msg.Payload(), decodedData)
	if err != nil {
		log.Fatal("unmarshaling error: ", err)
	}
	fmt.Println(decodedData.GetId())
	fmt.Println(decodedData.GetTimestamp())
	fmt.Println(decodedData.GetSuhu())

	//unsubscribe from /go-mqtt/sample
	// if token := client.Unsubscribe("/alat/sensor/latest"); token.Wait() && token.Error() != nil {
	// 	fmt.Println(token.Error())
	// 	os.Exit(1)
	// }
}

func main() {
	threadBlocker := make(chan os.Signal, 1)

	opts := mqtt.NewClientOptions().AddBroker("ssl://c242f3f8335f467a8f2a0edd82b5ab74.s2.eu.hivemq.cloud:8883").SetClientID("client-2")
	opts.SetUsername("562jeko")
	opts.SetPassword("Ando!997")
	opts.SetDefaultPublishHandler(callback)
	opts.OnConnect = func(c mqtt.Client) {
		//subscribe to the topic /go-mqtt/sample and request messages to be delivered
		//at a maximum qos of zero, wait for the receipt to confirm the subscription
		if token := c.Subscribe("alat/sensor/latest", 0, callback); token.Wait() && token.Error() != nil {
			fmt.Println(token.Error())
			os.Exit(1)
		} else {
			fmt.Println("suksess")
		}
	}

	c := mqtt.NewClient(opts)
	if token := c.Connect(); token.Wait() && token.Error() != nil {
		panic(token.Error())
	} else {
		fmt.Printf("Connected to server\n")
	}
	defer c.Disconnect(250)

	// Pastiin main() gak langsung keluar
	<-threadBlocker
}
