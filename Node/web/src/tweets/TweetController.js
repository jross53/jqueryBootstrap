angular
    .module('tweetApp', ['ngMaterial', 'ngTagCloud'])
    .config(function ($mdIconProvider) {
        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg");
    })
    .controller('TweetController', [
        '$scope', '$http', TweetController
    ])
    .directive('sideNavHeader', function () {
        return {
            template: '<p>Click on an item to collect tweets</p>'
        }
    });

function TweetController($scope, $http) {
    $scope.selected = null;
    $scope.tweets = [];
    $scope.selectTweet = selectTweet;
    $scope.wordCloudData = [];
    $scope.collectingTweets = false;
    $scope.showTweetSentences = false;
    let tweetsForWordCloud;

    $scope.tweets = [
        {
            name: 'Apple',
            avatar: 'AppleLogo',
            wordForWordCloud: []
        },
        {
            name: 'Android',
            avatar: 'AndroidLogo',
            wordForWordCloud: []
        },
        {
            name: 'Microsoft',
            avatar: 'MicrosoftLogo',
            wordForWordCloud: []
        },
        {
            name: 'Angular',
            avatar: 'AngularLogo',
            wordForWordCloud: []
        }
    ];

    // $scope.selected = $scope.tweets[0];

    function selectTweet(tweet) {
        $scope.showTweetSentences = false;
        $scope.collectingTweets = true;
        $scope.selected = tweet;
        $scope.collectTweets(tweet.name);
    }

    function getClickedCluster(e) {
        var wordToFind = e.currentTarget.innerHTML;
        $scope.tweet = wordToFind;

        for (var i = 0; i < $scope.numOfClusters; i++) {
            var topics = $scope.clusters[i].clusterTopics;
            var word = topics.substring(1, topics.indexOf(':'));
            word = word.replace("[", "").replace("]", "");

            if (word === wordToFind) {
                return $scope.clusters[i];
            }
        }

        console.log(`cluster not found for word ${wordToFind}`);
        return undefined;
    }

    function displayTweetSentences(obj) {
        $scope.showTweetSentences = true;
        var cluster = getClickedCluster(obj);
        $scope.tweetSentences = cluster.clusteredSentences;
        $scope.showTweetSentences = true;
        $scope.$apply();
    }

    function parseCollectedTweets(results) {
        $scope.clusters = results.clusters;
        $scope.numOfClusters = results.numOfClusters;
        var topWords = [];
        for (var i = 0; i < $scope.numOfClusters; i++) {
            var topics = $scope.clusters[i].clusterTopics;
            var word = topics.substring(1, topics.indexOf(':'));
            word = word.replace("[", "").replace("]", "");
            var endIndex = topics.indexOf(",") != -1 ? topics.indexOf(",") : topics.length - 1;
            var weight = topics.substring(topics.indexOf(':') + 1, endIndex);

            topWords.push({
                text: word, weight: parseInt(weight), handlers: {
                    click: function (e) {
                        console.log("clicked tweet");
                        displayTweetSentences(e);
                    }
                }
            });
        }

        $scope.wordCloudData = topWords;
    }

    $scope.collectTweets = function (tweet) {
        $scope.wordCloudData = [];
        $scope.tweetSentences = [];
        $scope.tweet = tweet;
        $scope.collectingTweets = true;
        $scope.showCloud = false;
        $scope.showTweetSentences = false;
        $http.get('/twitter/getTweets', {params: {tweet: tweet}}).then(displayTweetsInWordCloud);
    };

    function displayTweetsInWordCloud(tweetData) {
        tweetsForWordCloud = tweetData.data.results;
        parseCollectedTweets(tweetsForWordCloud);
        $scope.collectingTweets = false;
        $scope.showCloud = true;
    }
}
