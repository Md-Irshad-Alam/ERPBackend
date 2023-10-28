const express =require('express')
const routers = require('./src/Routes/routes');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 6060;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/auth',routers)
// enable the static url               provide the  Rooth path 
app.listen(port, async(req, res)=>{
   await mongoose.connect('mongodb://0.0.0.0/ERP')
   .then((responce)=>{
    console.log("server is connected with databse ")
   }).catch((error)=>{
    console.log(`server connection is faild  ${error}` )
   })
      
    console.log("server is live on the http://localhost:6060");
})



