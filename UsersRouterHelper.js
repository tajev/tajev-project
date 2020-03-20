const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const dbName= 'SpeechTherapist',collectionName='users'; 


function sendEmail(account, params) {

  let transporter = nodemailer.createTransport(smtpTransport({        
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: account.user, 
          pass: account.password  
      }
  }));

  // array to list:
  let toEmail = params.to[0];
  for (var i = 1; i < params.to.length; i++) {
      toEmail += ', ' + params.to[i];
  }
 
  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Service" <xx@gmail.com>',
      to: toEmail, // list of receivers
      subject: params.subject, // Subject line
      text: params.text, // plain text body
      html: params.html, // html body
      attachments: params.attachments
  };

   // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    console.log('sending mail');
    if (error) {
      return error;
    } else {
       console.log('Message %s sent: %s', info.messageId, info.response);
       transporter.close();
    }
  });
}


function login(req,res) {
    console.log('users/login is accessed');

    MongoClient.connect(url, function(err, db) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
            
              }

        const dbo = db.db(dbName);
        const queryUser = {
            email : req.body.email,
            password : req.body.password
        };
        console.log(queryUser);
        
        dbo.collection(collectionName).findOne((queryUser), function(err, user) {
          if (err) {
            return res.sendStatus(500);
              }
        
          if (user) {
            return res.status(200).send(user);
              }
        // ------ user not found
        else{
            res.sendStatus(404);
          }   
         
        });
      });
    
};

function register(req,res){
    console.log("users/register is accessed");

    MongoClient.connect(url, function(err, db) {
      if (err) {
    console.log(err);
    return res.sendStatus(500);
    
      }
      const dbo = db.db(dbName);
      const queryUser = req.body;

      dbo.collection(collectionName).findOne({email : queryUser.email}, function(err, usersFound) {
        if (err) {
          console.log(err);
          return res.sendStatus(500);
          
            }
          if(usersFound){
            return res.sendStatus(400);
          }
          if (!courseMails.includes(req.body.email)){
            console.log('--courseMails--')
            return res.sendStatus(600);
          }
          console.log(queryUser);
        // if( req.body.email ){
        //   req.body.manager=true;
        // }
          dbo.collection(collectionName).insertOne(queryUser, function(err, result) {
            if (err){
              console.log(err);
              return res.sendStatus(500);
              
                }
                else{
                  res.status(201).send(queryUser);
                }
          
          });
      });
    });
}


function forgotPassword(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) {
      return res.sendStatus(500);
    }
    
    const dbo = db.db(myDb);
    const data = req.body;
    console.log('data.email1');
    console.log(data.email);
    dbo
    .collection(collectionName)
    .findOne({ email: data.email }, function(err, result) {
      console.log('data.email2');
      console.log(data.email);
        if (err) {
          console.log('err: dint find mail')
          return res.sendStatus(500);
        }
        // const token = authen.createTokenLink(data);
        const token = authen.createToken(data,timeResetPassword);
        let link = `http://localhost:3000/resetPassword/${token}`;

        try{
          sendEmail(account,
            {to: [data.email], // list of receivers
            subject: 'שחזור סיסמא לאתר לודיגיטל', // Subject line
            text:'',
            html:`<h2>שחזור סיסמא</h2>
                  <p>שלום,<br>קיבלת את המייל הזה בגלל שהנך (או מישהו אחר) ביקשת לשחזר את הסיסמא שלך באתר לודיגיטל.</p>
                  <a href=${link}>לחץ כאן לשינוי סיסמתך באתר לאחרת</a><br>
                  <p>נא לשים לב! הקישור תקף לרבע שעה בלבד!</p>
                  <p>(אם המייל לא נשלח על ידך, יש להתעלם ממנו)</p>`,
            attachments:''
           });
        }catch(error){
          console.log('cath error');
          return res.sendStatus(404);
        }
       console.log(res.status);
        return res.sendStatus(200);
          
        });
    });
}

function resetPassword(req, res) {
  
  console.log("forgotPassword");
  console.log(req.body);
  //***** לשנות את זה חזרה:::/
  if(!authen.authenticationIsOk(req.body.token)){
    return res.sendStatus(401);
  }
  MongoClient.connect(url, function(err, db) {
    if (err) {
      console.log("---1---");
      return res.sendStatus(500);
    }
    console.log("---2---");
    const dbo = db.db(myDb);

    dbo
    .collection(collectionName)
    .updateOne( { email : req.body.email }, {$set: { password : req.body.password }}, function(err, result) {
        if (err) {
          console.log("---4---");
          return res.sendStatus(500);
        }
        // else if (!result.result.nModified){
        else if (!result.result.n){
          return res.sendStatus(404);
        }else{
          return res.sendStatus(200);
        };
    });
    console.log("---6---");
  });
}



module.exports.register =register;
module.exports.login = login;


module.exports.forgotPassword = forgotPassword;
module.exports.resetPassword = resetPassword;


