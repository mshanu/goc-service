const mongoose = require('mongoose');
mongoose.Promise = global.Promise
mongoose.connection.on('error', console.error.bind(console, 'connection error:') );
const DB_URL = process.env.NODE_ENV === "test" ? "mongodb://localhost/test" : "mongodb://localhost:26017/goc"
mongoose.connect(DB_URL);
module.exports=mongoose
