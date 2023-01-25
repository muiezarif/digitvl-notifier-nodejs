const admin = require("firebase-admin");
const express = require("express");
const serviceAccount = require("./digitvl-notifier-firebase-adminsdk-7wtz1-5e3213f526.json");
const app = express();
app.use(express.json())
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
app.post("/send-notification",(req,res)=> {
    console.log(req.body)
    const message = {
        notification:{
            title:req.body.title,
            body:req.body.body
        },
        data:{
            url:req.body.url
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
app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });