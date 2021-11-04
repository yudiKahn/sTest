const mongoose = require('mongoose');

function connect(){
    mongoose.connect(process.env.MONGO_URI, {})
    .then(()=>console.log('db connected'))
    .catch((err)=>console.log(`error while connecting to db. Error: ${err}`));
};

module.exports = connect;