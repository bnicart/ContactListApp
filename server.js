var express = require("express");
var app = express();
var mongojs = require("mongojs");
var db = mongojs('myDB',['contacts']);
var bodyParser = require("body-parser");

/*
 * This line tells that the templates that will be use is in the public folder.
 * This line also tells to load the index.html inside the public folder.
 * */
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/favicon.ico", function( request, response ) {
  response.end();
});

app.get("/contact", function( request, response ) {
  console.log("GET '/contact' ");
  
  db.contacts.find(function(error, data) {
    response.json(data);
  });
});

app.get("/contact/:id", function( request, response ){
  var ID = request.params.id;
  console.log("GET '/contact/:" + ID + "'");
  db.contacts.findOne({ _id : mongojs.ObjectId(ID) }, function( error, data ) {
    response.json(data);
  });
});

app.post("/contact", function( request, response ) {
  console.log("POST '/contact' ");

  db.contacts.insert( request.body, function( error, data ) {
    response.json(data);
  });
});

app.put("/contact/:id", function( request, response ) {
  var ID = request.params.id;
  console.log("PUT '/contact/:" + ID + "'");

  db.contacts.findAndModify(
    { query: {_id: mongojs.ObjectId(ID)}, 
      update: { 
        $set: { 
          name: request.body.name, 
          email: request.body.email, 
          number: request.body.number 
        }
      },
      new: true
    }, function( error, data) {
      response.json(data);
    });
});

app.delete("/contact/:id", function ( request, response ) {
  console.log("DELETE '/contact' ");
  var ID = request.params.id;
  db.contacts.remove({ _id: mongojs.ObjectId(ID) }, function( error, data ) {
    response.write("Success");  
    response.end();
  });
});

app.listen(process.env.PORT || 3000);
console.log("Server started!");
