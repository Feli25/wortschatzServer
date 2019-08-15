var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
const session = require("express-session")
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

// const cors = require('cors')


// Set "Access-Control-Allow-Origin" header
// app.use(cors({
//   origin: (origin, cb) => {
//     cb(null, origin && origin.startsWith('http://localhost:'))
//   },
//   optionsSuccessStatus: 200,
//   credentials: true
// }))
// app.use(logger('dev'))
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(cookieParser())

// app.use(session({
//   secret: process.env.SESSION_SECRET || 'irongenerator',
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }))
// require('./passport')(app)

app.use('/word', require('./routes/word'))
app.use('/story', require('./routes/story'))

app.get('/', function (req, res) {
 res.send(JSON.stringify({ Hello: 'Worldssss'}));
});

// app.get('')

app.listen(port, function () {
 console.log(`Example app listening on port !`);
});