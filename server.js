// Dependencies
var express = require("express");
var bodyParser = require("body-parser");

// Configuration, sets up the basic properties for the express server
// Tells node that we are creating an "express" server
var app = express();

// Sets an initial port.
var PORT = process.env.PORT || 8080;

// BodyParser to interpret data sent to server.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Router points server to route files so it know how to respond when users visit URLs.
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Listener to start the server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
