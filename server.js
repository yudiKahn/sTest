const express = require('express');
const path = require('path');
const app = express();
const useApi = require('./server/service/useApi');
const connectDb = require('./server/service/connectDb');
require('dotenv').config();

//force https
app.use((req,res,next)=>{
    if(!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === 'production'){
        return res.redirect('https://' + req.get('host') + req.url);
    }
    return next();
});

app.use(express.json({strict: false}));
app.use(express.static('./server/public'));
app.use((req,res,next)=>{
    try{
        next();
    } catch (err){
        res.send(err.toString())
    }
});

connectDb();
useApi(app);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}


const listener = app.listen(process.env.PORT||8080, ()=>{
    if(process.env.NODE_ENV !== 'production'){
        require('dns').lookup(require('os').hostname(), (er,ad,fa)=>{
            console.log(`backend runing on http://${ad}:${listener.address().port}`);
        });
    }
});