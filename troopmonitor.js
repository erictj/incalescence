////////
// setup
////////

// add clone to array prototype
Array.prototype.clone = function() {
    return this.slice(0);
}

// initialize api
var api = pinoccioAPI();

// read-only token
api.token = "35b232f3538f0e157751f04136e2a0b4";
api.rest({url:"https://api.pinocc.io/v1/account"}, function(err, data){
    console.log("success?", err, data);
});

// sync api with troop
var s = api.sync();

// data object types
led = [];
temp = [];
power = [];

// There are only 6 sensors
for(var i = 0; i < 6; i++) {
    led[i] = 0;
    temp[i] = 0;
    power[i] = 0;
}






///////////////////////////////
// listening to the data stream
///////////////////////////////

s.on('data',function(data){
    
    var index = parseInt(data.scout) -1;
    var whichArray = -1;
    
    switch(data.type) {
        case "led":
            led[index] = new LED(data);
            // console.log((index+1) + " ", led[index]);
            whichArray = 0;
            break;
        case "temp":
            temp[index] = new Temp(data);
            console.log((index+1) + " ", temp[index]);
            whichArray = 1;
            break;
        case "power":
            power[index] = new Power(data);
            // console.log((index+1) + " ", power[index]);
            whichArray = 2;
            break;
        default:
            // skip data object
    }
    
    // updateCanvas(whichArray);
    
    // console.log(data);
    
}).on('error',function(error){
    console.log('sync error',error);
});

// parse useless information out of objects
function LED(scout) {
    this.currentColor = scout.value.led.clone();
    this.idColor = scout.value.torch.clone();
}

function Temp(scout) {
    this.currentTemp = scout.value.current;
    this.localHigh = scout.value.high;
    this.localLow = scout.value.low;
}

function Power(scout) {
    this.batteryRemaining = scout.value.battery;
    this.charging = scout.value.charging;
    this.currentVoltage = scout.value.voltage;
}
