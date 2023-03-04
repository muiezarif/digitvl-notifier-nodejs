const admin = require("firebase-admin");
const express = require("express");
const serviceAccount = require("./digitvl-notifier-firebase-adminsdk-7wtz1-5e3213f526.json");
const app = express();
const cors=require("cors");
// var bodyParser = require('body-parser');
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
// app.use(bodyParser.json());

app.use(express.json())
app.use(cors(corsOptions))
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.post("/send-notification",(req,res)=> {
    console.log("Request body")
    console.log(req.body)
    const message = {
        notification:{
            title:req.body.title,
            body:req.body.body,
            sound:"default"
        },
        data:{
            title:req.body.title,
            body:req.body.body,
            url:req.body.url,
            coins:req.body.coins
        },
        tokens:req.body.tokens
    }
    
    admin.messaging().sendMulticast(message).then(res => {
        console.log("response")
        console.log(res)
        console.log(res.responses[0].error.message)
    }).catch(err => {
        console.log("error")
        console.log(err.message)
    })
})
app.listen(process.env.PORT || 3030, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });