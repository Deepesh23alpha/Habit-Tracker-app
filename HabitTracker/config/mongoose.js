const mongoose = require('mongoose');

// Storing the db on mongo atlas.
const DB = "mongodb+srv://deepeshb24:lG65CG9VpGeAp4Dz@habittracker.lptlutl.mongodb.net/?retryWrites=true&w=majority&appName=habitTracker";

// Connecting to db.
mongoose.connect(DB).then(()=>{
    console.log('Connection successful!');
}).catch((err) => console.log("no connection " + err));

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;