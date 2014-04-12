// this example works both on server and browser with browserify.

var pinoccio = require('pinoccio');

var token = "my auth token here";

// To get your auth token run ```pinoccio token``` in your terminal 
// You may need to login. To install the cli run ```sudo npm install -g pinoccio```

var api = pinoccio(token);

var s = api.sync();

s.on('data',function(data){

  // if the event is not type data or token its something you can query from /v1/stats as report={type}
  console.log('event!',data);

}).on('error',function(error){

  // after an error a new sync stream will have to be created.
  // errors will happen due to connectivity etc.
  console.log('sync error',error);

});