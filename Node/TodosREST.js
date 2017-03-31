let express = require('express');
let bodyParser = require('body-parser');
let colors = require('colors');
let router = express.Router();
let http = require('http');
let request = require('request');

router.use(bodyParser.json());


//REST endpoints
router.get('/twitter/getTweets', function (req, res) {

    request({
        url: `http://localhost:8181/twitter/getTweets?tweet=${req.query.tweet}`,
        json: true
    }, function (error, response, body) {
        res.status(200).send(body);
    });
});

module.exports = router;