let express = require('express');
let router = express.Router();
let mongoDAO = require('./mongoDAO');

router.get('/twitter/getTweets', function (req, res) {
    let tweet = req.query.tweet.toLowerCase();
    mongoDAO.read(tweet, function(err, tweet) {
        if(err) {
            throw err;
        }

        //simulate fetching tweets since they are just in mongo now
        setTimeout(function() {
            res.status(200).send(tweet.cluster);
        }, 1500);
    });

});

module.exports = router;