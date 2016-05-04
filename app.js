"use strict";
var express = require("express");
var path = require("path");
var sql = require("mssql");
require('dotenv').config();
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/tweets', function (req, res) {
    var startTime = req.query.startTime;
    var endTime = req.query.endTime;
    var sqlQuery = "SELECT id, retweet_count, tweet_text, tweeted_by, tweet_id, created_at, timestamp\n                      FROM dbo.tweets WHERE timestamp >= @startTime AND timestamp <= @endTime ORDER BY timestamp";
    var request = new sql.Request();
    request.input('startTime', sql.DateTime, new Date(startTime));
    request.input('endTime', sql.DateTime, new Date(endTime));
    request.query(sqlQuery).then(function (results) {
        res.send(results).end();
        return;
    })
        .catch(function (ex) {
        res.status(500).end();
    });
});
app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
var config = {
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
};
sql.connect(config).then(function () {
    app.listen(app.get('port'), function () {
        console.log("Tweeter Center Tweet Analyzer Started Up");
    });
})
    .catch(function (ex) {
    console.log('Could not connect to sql database');
    console.log(JSON.stringify(ex));
});
