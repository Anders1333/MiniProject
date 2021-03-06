var mongoose = require('mongoose');
const dbURI = require("./settings").TEST_DB_URI;

function connect(dbUriString){
 const conStr = dbUriString ? dbUriString : dbURI;
 console.log('Connecting to:'+ dbURI)
 // This returns a promise
 return mongoose.connect(conStr,{ useNewUrlParser: true, useCreateIndex: true }); 
}
mongoose.connection.once('connected', function () { 
 console.log('Mongoose default connection open to ' + dbURI);
});
mongoose.connection.once('error',function (err) { 
 console.log('Mongoose default connection error: ' + err);
});

module.exports = connect;
