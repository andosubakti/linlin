package main

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"

	//import the Paho Go MQTT library
	"log"
	"os"

	mqtt "github.com/eclipse/paho.mqtt.golang"
	"github.com/golang/protobuf/proto"
)

type maxx struct {
	SuhuMax int32 `json:"suhumax"`
}

type min struct {
	SuhuMin int32 `json:"suhumin"`
}

var maxSlice = []maxx{}
var suhu_maksimal int32 = 25
var MsgSlice = []Msg{}
var minSlice = []min{}
var suhu_minimal int32 = 25

//define a function for the default message handler
var callback mqtt.MessageHandler = func(client mqtt.Client, msg mqtt.Message) {

	// print raw (encoded) data
	// fmt.Printf("TOPIC: %s\n", msg.Topic())
	// fmt.Printf("MSG: %s\n", msg.Payload())

	//Decode Protobuf
	decodedData := Msg{}
	err := proto.Unmarshal(msg.Payload(), &decodedData)
	if err != nil {
		log.Fatal("unmarshaling error: ", err)
	}

	// MsgSlice slice to seed record msg data.
	MsgSlice = append(MsgSlice, decodedData)

	// Ngitung MAX
	if decodedData.GetSuhu() >= 25 && suhu_maksimal <= decodedData.GetSuhu() {
		maxSlice = []maxx{}
		suhu_maksimal = decodedData.GetSuhu()
		suhu_max := maxx{decodedData.GetSuhu()}
		maxSlice = append(maxSlice, suhu_max)
	}

	// Ketika suhu sudah kembali ke 25, namun suhu max masih 35
	if suhu_maksimal > decodedData.GetSuhu() {
		suhu_maksimal = 25
	}

	// Ngitung MIN
	if decodedData.GetSuhu() <= 25 {
		minSlice = []min{}
		suhu_minimal = decodedData.GetSuhu()
		suhu_min := min{decodedData.GetSuhu()}
		minSlice = append(minSlice, suhu_min)
	} else {
		suhu_minimal = 25
		minSlice = []min{}
		suhu_min := min{25}
		minSlice = append(minSlice, suhu_min)
	}

	// print strcut hasil decoding
	// fmt.Println(decodedData.GetId())
	// fmt.Println(decodedData.GetTimestamp())
	// fmt.Println(decodedData.GetSuhu())

	// Ubah struct ke JSON
	// cnvToJson, err := json.Marshal(decodedData)
	// if err != nil {
	// 	fmt.Println(err)
	// 	return
	// }
	// fmt.Println(string(cnvToJson))

	//unsubscribe from /go-mqtt/sample
	// if token := client.Unsubscribe("/alat/sensor/latest"); token.Wait() && token.Error() != nil {
	// 	fmt.Println(token.Error())
	// 	os.Exit(1)
	// }
}

func main() {
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

	getJsonData := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.IndentedJSON(http.StatusOK, MsgSlice)
		MsgSlice = []Msg{} // reset lagi setelah nge get
	}

	getJsonMaxx := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.IndentedJSON(http.StatusOK, maxSlice)
		maxSlice = []maxx{} // reset lagi setelah nge get
	}

	getJsonMin := func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.IndentedJSON(http.StatusOK, minSlice)
		minSlice = []min{}
	}

	router := gin.Default()
	router.GET("/latest", getJsonData)
	router.GET("/max", getJsonMaxx)
	router.GET("/min", getJsonMin)
	router.Run("localhost:8080")
}
