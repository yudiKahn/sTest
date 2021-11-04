const express = require('express');
const path = require('path');
const app = express();
const useApi = require('./server/service/useApi');
const connectDb = require('./server/service/connectDb');
require('dotenv').config();

app.use(express.json({strict: false}));
app.use(express.static('./server/public'));
app.use(express.static('./client/build'));
app.use((req,res,next)=>{
    try{
        next();
    } catch (err){
        res.send(err.toString())
    }
});

connectDb();
useApi(app);

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname, "client", "build", "index.html"))
});



const listener = app.listen(process.env.PORT||8080, ()=>{
    console.log(`runing on http://localhost:${listener.address().port}`);
});