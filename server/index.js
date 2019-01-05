const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: path.join(__dirname, "..", ".env") });
// require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const passport = require("passport");
// const Strategy = require(`${__dirname}/strategy.js`);
const Auth0Strategy = require('passport-auth0');
const garageController = require("./controllers/myGarage");

const brandController = require("./controllers/brand");
const modelController = require("./controllers/model");
const cors = require("cors");
const session = require("express-session");

const app = express();
app.use(express.static(`${__dirname}/../build`));

app.use(bodyParser.json());

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))
// app.use(cors());


app.use(passport.initialize());
app.use(passport.session());


massive(process.env.CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log('Error of db:: ', err));
passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {

  done(null, profile);
}));


passport.serializeUser(function (user, done) {
  // console.log(user);

  done(null, {
    id: user.id,
    display: user.displayName,
    nickname: user.nickname,
    email: user.emails[0].value
  });
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

app.get(
  "/login",
  passport.authenticate("auth0", {
    // successRedirect: "/me",
    successRedirect: "https://encyclepedia.now.sh/",
    failureRedirect: "/login",
    failureFlash: true
  })
);

app.get("/me", (req, res, next) => {
  console.log(4444, req.user);
  req.session.user = req.user;
  if (!req.user) {
    // res.redirect("/login");
    return res.status(200).send(false)
  } else {
    const dbInstance = req.app.get("db");

    dbInstance.get_user([req.user.id]).then(user => {
      if (!user[0].id) {
        dbInstance.post_user([req.user.nickname, req.user.id]);
      }
    });

    //change this url when hosted
    // https://newencyclepedia.now.sh
    // res.redirect("https://encyclepedia.now.sh/");
    // req.user === req.session.passport.user
    // console.log( req.user )
    // console.log( req.session.passport.user );

    res.status(200).send(true);
  }
});

/*
Mikels server help
app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: process.env.SUCCESS_REDIRECT, => https://encyclepedia.now.sh/
  failureRedirect: '/auth'
}));
app.get('/auth/me', (req, res) => {
  if (!req.user) {
    return res.status(200).send(false)
  }
  return res.status(200).send(true);
})


app.get('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(302, process.env.REDIRECT)
})
*/
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

// app.get("/*", express.static(path.join(__dirname, "..", "build")));
// const path = require('path')
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})
const PORT = 4000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))

