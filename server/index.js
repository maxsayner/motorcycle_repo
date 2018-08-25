const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
const strategy = require(`${__dirname}/strategy.js`);
const garageController = require("./controllers/myGarage");

const brandController = require("./controllers/brand");
const modelController = require("./controllers/model");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(bodyParser.json());
app.use(cors());

massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(
  session({
    secret: "sup dude",
    resave: false,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.use(strategy);

passport.serializeUser(function(user, done) {
  // console.log(user);

  done(null, {
    id: user.id,
    display: user.displayName,
    nickname: user.nickname,
    email: user.emails[0].value
  });
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/me",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.get("/me", (req, res, next) => {
  console.log(4444, req.user);
  req.session.user = req.user;
  if (!req.user) {
    res.redirect("/login");
  } else {
    const dbInstance = req.app.get("db");

    dbInstance.get_user([req.user.id]).then(user => {
      if (!user[0].id) {
        dbInstance.post_user([req.user.nickname, req.user.id]);
      }
    });

    //change this url when hosted
    res.redirect("http://localhost:3000/");
    // req.user === req.session.passport.user
    // console.log( req.user )
    // console.log( req.session.passport.user );
  }
});

//routes
app.get("/api/brands", brandController.get);
app.get("/api/models", modelController.get);
app.get("/api/models/:id", modelController.getModels);
app.get("/api/specs/:id", modelController.getSpecs);
app.get(
  "/api/user",
  (req, res) => console.log(3333, req.session) || res.send(req.session.user)
);

app.get("/api/get_garage_bikes/:user_id", modelController.getModelsInGarage);
// app.get("/api/models/:id", modelController.getSavedBike);
// app.get("/api/users/:id", usersController.getUsers);

app.post("/api/brands", brandController.post);
app.post("/api/models", modelController.post);
app.post("/api/post_models", garageController.postSavedBike);

app.delete("/api/delete_models/:model_id", garageController.deleteBike);

app.get("/*", express.static(path.join(__dirname, "..", "build")));

app.listen(4000, () => {
  console.log("lstening on port 4000");
});
