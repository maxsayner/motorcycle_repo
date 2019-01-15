require('dotenv').config();
const express = require('express'),
  session = require('express-session'),
  bodyParser = require('body-parser'),
  massive = require('massive'),
  passport = require('passport'),
  Auth0Strategy = require('passport-auth0');
const path = require('path');

const garageController = require("./controllers/myGarage");
const usersController = require('./controllers/users.js')
const brandController = require("./controllers/brand");
const modelController = require("./controllers/model");

const app = express();

app.use(bodyParser.json());
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

massive(process.env.CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('You are connected to the database!')
})
.catch(err => console.log('Error of db:: ', err));


passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
}, function (accessToken, refreshToken, extraParams, profile, done) {
  const db = app.get('db')
  console.log(profile)
  // db.get_user([profile.identities[0].user_id]).then(user => {
  //   if (user[0]) {
  //     return done(null, user[0].id)
  //   }
  //   else {
  //     const user = profile._json
  //     db.post_user([user.identities[0].user_id, user.name, user.identities[0].user_id])
  //       .then(user => {
  //         return done(null, user[0].id)
  //       })
  //   }
  // })
  return done(null, profile)
}))


app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
  successRedirect: 'http://localhost:3000/#/',
  failureRedirect: '/auth'
}));
app.get('/auth/me', (req, res) => {
  if (!req.user) {
    return res.status(404).send('User not found')
  }
  console.log('user', req.user)
  req.session.user = req.user;
  const dbInstance = req.app.get("db");

  dbInstance.get_user([req.user.id]).then(user => {
    if (!user[0].id) {
      dbInstance.post_user([req.user.nickname, req.user.id]);
    }
  });
  return res.status(200).send(req.user);
})

app.get('/auth/logout', (req, res) => {
  req.logOut();
  res.redirect(302, 'http://localhost:3000/#/')
})


// ROUTES
app.get("/api/brands", brandController.get);
app.get("/api/models", modelController.get);
app.get("/api/models/:id", modelController.getModels);
app.get("/api/specs/:id", modelController.getSpecs);

app.get("/api/get_garage_bikes/:user_id", modelController.getModelsInGarage);
app.get("/api/models/:id", garageController.getSavedBike);
app.get("/api/user/:id", usersController.getUsers);

app.post("/api/brands", brandController.post);
app.post("/api/models", modelController.post);
app.post("/api/post_models", garageController.postSavedBike);

app.delete("/api/delete_models/:model_id", garageController.deleteBike);

passport.serializeUser(function (user, done) {
  // console.log(user)
  done(null, {
    id: user.id,
    display: user.displayName,
    nickname: user.nickname,
    email: user.emails[0].value
  });
});


// passport.deserializeUser(function (id, done) {
//   app.get('db').find_current_user([id])
//     .then(user => {
//       done(null, user[0])
//     })
// });
passport.deserializeUser(function (obj, done) {
  done(null, obj);
});


// app.get('*', (req, res) => {
//   console.log("None Met");
//   res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
// })

const PORT = 4000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))