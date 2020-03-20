
console.log("app is loading");
const express = require("express");
const app = express();
const UsersRouterHelper = require('./UsersRouterHelper');
const routeHelper = require("./routeHelper");
const multer = require("multer");
const upload = multer();




const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');




// used for json inside body 
app.use(express.json());

// app.get("/api", (req, res) => {
//   console.log("root is accessed");
//   res.send({res:"result from server"});
// });

///-----------users----------//

 app.use(express.json());


// app.post("/users/register", (req, res) => {
//   UsersRouterHelper.register(req,res);
 
// });

// app.post("/users/login", (req, res) => {
//   UsersRouterHelper.login(req,res);
 
// });

//-----------------------------------------------------------------------------------------//



// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// app.use('/public', express.static(path.join(__dirname, 'public')));


// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// app.get('/', (req, res) => {
//   res.render('contact');
// });


app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const { sendEmail } = require('./mail');

app.post("/api/sendMail", (req, res) => {

  console.log(req.body)
  sendEmail(req.body.email, req.body.name, "hello")

})







app.post("/users/forgotPassword", (req, res) => {
  routeHelper.forgotPassword(req, res);
});

app.post("/users/newUser", (req, res) => {
  routeHelper.newUser(req, res);
})


app.put("/users/resetPassword", (req, res) => {
  console.log("resetPassword");
  routeHelper.resetPassword(req, res);
});


app.post("/users/login", (req, res) => {
  routeHelper.login(req, res);
});



app.post("/users/register", (req, res) => {
 routeHelper.register(req, res);
});

app.post("/users/forgotPassword", (req, res) => {
  console.log("forgotPassword");
  routeHelper.forgotPassword(req, res);
});

app.post("/users/newUser", (req, res) => {
  console.log("newUser");
  routeHelper.newUser(req, res);
});

app.put("/users/resetPassword", (req, res) => {
  console.log("resetPassword");
  routeHelper.resetPassword(req, res);
});

// app.post("/graduate/insert", req,jwtVerifier({secret:authen.secret}), res=> {
//   console.log('graduateInsert');
//   routeHelper.graduateInsert( req, res);
// });
// app.post("/graduate/insert", upload.any(),(req, res) => {
//   routeHelper.graduateInsert(req, res);
// });

// app.get("/graduate/get", (req, res) => {
//   routeHelper.graduateGet(req, res);
// });

// app.delete("/graduate/delete/:id", (req, res) => {
//   routeHelper.graduateDelete(req, res);
// });

// app.post("/contactUs", (req, res) => {
//   console.log('contactUs');
//   routeHelper.contactUs( req, res);
// });

// app.get("/getContactsList", (req, res) => {
//   console.log('getContactsList');
//   routeHelper.getContactsList( req, res);
// });







const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
