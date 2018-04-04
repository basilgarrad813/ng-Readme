// namespaces
var express = require("express");
var bodyParser = require("body-parser");

//modules
var logger = require("./api/lib/loggerLib");

var port = process.env.PORT;
var apiRouter = express.Router();
var pageRouter = express.Router();
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//middleware for api requests
apiRouter.use(function(req, res, next) { 
  if(process.env.NODE_ENV == "debug")
  logger.log("A request was recieved"); //if you disable this, disable the above line or the app will break
  next();
});

//middleware for page requests
pageRouter.use(function(req, res, next) { 
  next();
});


// test route to make sure everything is working
apiRouter.get("/", function(req, res) {
  logger.log("Ping recieved from: " + req.connection.remoteAddress);
  res.status(200).json({ message: "all is well" });
});

apiRouter.route("/auth/user")

  .post(function(req, res) {
    // Authenticate the user. return a response a JWT if the user is authenticated. Return 401 is not.

    var username = req.body.username;
    var hashedPassword = req.body.hashedPassword;

    if (username.length > 0 && hashedPassword.length > 0) {
      try {
        logger.log.info("Authenticating...");
        auth.authenticateUser(username, hashedPassword, function(
          err,
          userid,
          jwt
        ) {
          if (err === 0) {
            logger.log.info("User jwt: " + jwt);
            res.json({ access_token: jwt });
          } else {
            logger.log.error(
              "Unauthorized, jwt message: " + JSON.stringify(jwt)
            );
            res.status(401).json({ error: jwt });
          }
        });
      } catch (err) {
        logger.log.error(err);
        res.sendStatus(500);
      }
    } else {
      res.status(401).json({ error: "Missing username or password" });
    }
  });
  apiRouter.route("/admin/user")

  //create a new user, return 200
  .post(function(req, res) {
    var userObject = req.body.userObject;
    userSchema.getModel(function(userModel) {
      if (userSchema instanceof Error) {
        res.send(500);
      } else {
        userSchema.createUser(userModel, userObject, function(result) {
          checkErr(result, function(iserr) {
            if (iserr) {
              res.status(500).send(result);
            } else {
              res.sendStatus(200);
            }
          });
        });
      }
    });
  })
  //get a user obect by username
  .get(function(req, res) {
    var userNameToSearch = req.header("username");
    userSchema.getModel(function(returnedModel) {
      db.findDocument(returnedModel, { userName: userNameToSearch }, function(
        userDoc
      ) {
        if (userDoc instanceof Error) {
          res.status(500);
        } else if (userDoc === null) {
          res.status(404).json({ error: "User not found" });
        } else {
          res.json(userDoc);
        }
      });
    });
  });

apiRouter.route("/admin/user/:username")
  .patch(function (res,res) {
    
  })

var checkErr = function(err, callback) {
  if (err instanceof Error) {
    callback(true);
  } else {
    callback(false);
  }
};


app.use("/api", apiRouter);
app.use("/", pageRouter)

app.listen(port);