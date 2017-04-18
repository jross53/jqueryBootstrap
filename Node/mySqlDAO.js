/**
 * Created by Jordan.Ross on 4/17/2017.
 */
let mysql = require('mysql');
let angularTweet = require('./angularTweet');
let androidTweet = require('./androidTweet');
let appleTweet = require('./appleTweet');
let microsoftTweet = require('./microsoftTweet');
const tableName = 'tweetclusters';

let connection = mysql.createConnection({
    host: 'localhost',
    user: 'tweetUser',
    password: 'tweet',
    database: 'nodedb'
});

exports.setUpDbWithTweets = function () {
    deleteAllTweets();
    insertTestTweets();
    console.log('Database is ready with test data');
};

exports.setUpDbWithTweets();

function deleteAllTweets() {
    connection.query('DELETE FROM tweetclusters', function (err) {
        if (err) {
            throw err;
        }
    });
}

function insertTestTweets() {
    insertTweet(androidTweet);
    insertTweet(angularTweet);
    insertTweet(appleTweet);
    insertTweet(microsoftTweet);
}

function insertTweet(tweet) {
    connection.query(`INSERT INTO ${tableName} SET ?`,
        {Tweet: tweet.name, Cluster: JSON.stringify(tweet.cluster)}, function (err) {
            if (err) {
                throw err;
            }
        });
}

exports.read = function (name, callback) {
    connection.query('SELECT * FROM tweetclusters WHERE Tweet = ?', [name], function (err, result) {
        if (err) {
            return callback(err, null);
        }
        let [tweet] = result;
        callback(err, tweet);
    });
};