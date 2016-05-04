import * as express from "express";
import * as path from "path";
import * as sql from "mssql";

require('dotenv').config();

var app = express();
app.set('port', process.env.PORT || 3000);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
 // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname, 'public')));
app.get('/tweets', (req, res) => {
    const startTime = req.query.startTime;
    const endTime = req.query.endTime;
    
    const sqlQuery = `SELECT id, retweet_count, tweet_text, tweeted_by, tweet_id, created_at, timestamp
                      FROM dbo.tweets WHERE timestamp >= @startTime AND timestamp <= @endTime`;
    
    const request = new sql.Request();
    request.input('startTime', sql.DateTime, new Date(startTime));
    request.input('endTime', sql.DateTime, new Date(endTime));
    
    request.query(sqlQuery).then((results) => {
         res.send(results).end();
        return;
    })
    .catch((ex) => {
        res.status(500).end();
    })
})
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
})

var config: sql.config = {
			server: process.env.DB_HOST,
			database: process.env.DB_NAME,
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
			options: {
				encrypt: true // Use this if you're on Windows Azure
			}
			
		};
		

sql.connect(config).then(() => {
    app.listen(app.get('port'), () => {
        console.log(`Tweeter Center Tweet Analyzer Started Up`)
    });  
})
.catch((ex) => {
    console.log('Could not connect to sql database');
    console.log(JSON.stringify(ex));
})

