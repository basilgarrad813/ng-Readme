// namespaces
var express = require("express");
var bodyParser = require("body-parser");

//modules
logger = require("./lib/logger.lib");

var port = process.env.PORT || 5001;
var router = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

logger.init();

//middleware for api requests
router.use(function(req, res, next) { 
  //if(process.env.NODE_ENV == "debug")
  logger.log.info("A request was recieved"); //if you disable this, disable the above line or the app will break
  next();
});

// test route to make sure everything is working
router.get("/", function(req, res) {
  logger.log.info("Ping recieved from: " + req.connection.remoteAddress);
  res.status(200).json({ message: "all is well" });
});

var checkErr = function(err, callback) {
  if (err instanceof Error) {
    callback(true);
  } else {
    callback(false);
  }
};


app.use("/api", router);

app.listen(port);
console.log("Listening on port: " + port);