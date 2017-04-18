let express = require('express');
let router = express.Router();
let mySqlDAO = require('./mySqlDAO');

router.get('/twitter/getTweets', function (req, res) {
    let tweet = req.query.tweet.toLowerCase();
    mySqlDAO.read(tweet, function(err, tweet) {
        if(err) {
            throw err;
        }

        //simulate fetching tweets since they are just in mysql now
        setTimeout(function() {
            res.status(200).send(tweet.Cluster);
        }, 1500);
    });

});

module.exports = router;