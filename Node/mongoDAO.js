let mongo = require('mongodb').MongoClient;
let angularTweet = require('./angularTweet');
let androidTweet = require('./androidTweet');
let appleTweet = require('./appleTweet');
let microsoftTweet = require('./microsoftTweet');

// Connection URL
const URL = `mongodb://127.0.0.1:27017/tweets`;

exports.setUpDbWithTweets = function() {
    deleteAll(deleteCallbackForInsertingTestTweets);
};

function deleteCallbackForInsertingTestTweets(err) {
    if(err) {
        throw err;
    }

    insertTestTweets();
}

function insertTestTweets() {
    mongo.connect(URL, function(err, db) {
        if (err) {
            throw err;
        }

        db.collection('tweets').insertOne(androidTweet, function(err) {
            if(err) {
                throw err;
            }
        });
        db.collection('tweets').insertOne(appleTweet, function(err) {
            if(err) {
                throw err;
            }
        });
        db.collection('tweets').insertOne(angularTweet, function(err) {
            if(err) {
                throw err;
            }
        });
        db.collection('tweets').insertOne(microsoftTweet, function(err) {
            if (err) {
                throw err;
            }

            console.log('Done inserting test tweets');
            db.close();
        });
    });
}

function deleteAll(callbackFunc) {
    mongo.connect(URL, function(err, db) {
        if (err) {
            return callbackFunc(err);
        }

        db.collection('tweets')
            .deleteMany(
                {},
                function(err, result) {
                    callbackFunc(err, result);
                    db.close()
                }
            )
    })
}


exports.readAll = function(callbackFunc) {
    mongo.connect(URL, function(err, db) {
        if (err) {
            return callbackFunc(err, null);
        }

        db.collection('tweets').find(function(err, result) {
            callbackFunc(err, result);
            db.close();
        });
    });
};

exports.read = function(name, callbackFunc) {
    mongo.connect(URL, function(err, db) {
        if (err) return callbackFunc(err, null);

        db.collection('tweets').findOne({name: name}, {}, function(err, result) {
            callbackFunc(err, result);
            db.close();
        });
    });
};