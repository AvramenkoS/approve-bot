const express = require('express')
const config = require('config')

const app = express()
const port = config.get('port') || 5000

// app.use(function (req, res, next) {
//
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
//
//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//
//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//
//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);
//
//     // Pass to next layer of middleware
//     next();
// });

app.use(express.json({extended: true}))
app.use('/api/bot', require('./routes/bot.routes'))

async function start() {
    try {
        app.listen(port, () => console.log('Start', port))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}

start()