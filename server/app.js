"use strict";
const express = require("express");
const path = require("path");
var app = express();
app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(app.get('port'), () => {
    console.log(`Tweeter Center Tweet Analyzer Started Up`);
});
//# sourceMappingURL=app.js.map