var _clusters;
var _numOfClusters;
function getMicrosoftTweets() {
    getTweets("Microsoft");
}

function getNikeTweets() {
    getTweets("Nike");
}

function getOremTweets() {
    getTweets("Orem");
}

function getAppleTweets() {
    getTweets("Apple");
}

function getAmazonTweets() {
    getTweets("Amazon");
}

function getTweets(tweet) {
    var url = window.location + "";
    if (url.indexOf("http") == -1) {
        //url = url.substring(url.indexOf(":") + 3, url.length);
        url = "http://" + url;
    }
    url += "twitter/getTweets";
    $("#collectingTweets").show();
    $.ajax({
        type: 'POST',
        url: window.location + "twitter/getTweets",
        data: {tweet: tweet},
        success: function (data) {
            $("#collectingTweets").hide();
            displayTweets(data);
        },
        error: function () {
            $("#collectingTweets").hide();
            alert('There was an error collecting tweets');
        }
    });
}

function getTopWordsAndWeights(results) {
    _clusters = results.clusters;
    _numOfClusters = results.numOfClusters;
    var topWords = [];
    for (var i = 0; i < _numOfClusters; i++) {
        var topics = _clusters[i].clusterTopics;
        var word = topics.substring(1, topics.indexOf(':'));
        word = word.replace("[", "").replace("]", "");
        var endIndex = topics.indexOf(",") != -1 ? topics.indexOf(",") : topics.length - 1;
        var weight = topics.substring(topics.indexOf(':') + 1, endIndex);
        topWords.push(word);
        topWords.push(weight);
    }

    return topWords;
}

function getWords(topWordsAndWeights) {
    var words = [];

    for (var i = 0; i < topWordsAndWeights.length; i += 2) {
        var word = topWordsAndWeights[i];
        var weight = topWordsAndWeights[i + 1];
        words.push({
            text: word, weight: weight, handlers: {
                click: function (e) {
                    displayTweetSentences(e);
                }
            }, html: {value: word + "," + weight}
        });
    }
    return words;
}

function displayTweets(data) {
    if (data.indexOf("Bad request") != -1) {
        alert('Problem clustering tweets');
        return;
    }
    var topWordsAndWeights = getTopWordsAndWeights(JSON.parse(data).results);
    var words = getWords(topWordsAndWeights);
    if ($("#tweets *").length != 0) {
        $("#tweets *").remove();
        $("#tweetSentences *").remove();
    }
    $("#tweets").jQCloud(words);
}

function getClickedCluster(e) {
    var value = $(e.currentTarget).attr("value");
    var valueSplit = value.split(',');
    var wordToFind = valueSplit[0];
    var weightToFind = valueSplit[1];

    for (var i = 0; i < _numOfClusters; i++) {
        var topics = _clusters[i].clusterTopics;
        var word = topics.substring(1, topics.indexOf(':'));
        word = word.replace("[", "").replace("]", "");
        var endIndex = topics.indexOf(",") != -1 ? topics.indexOf(",") : topics.length - 1;
        var weight = topics.substring(topics.indexOf(':') + 1, endIndex);

        if (word == wordToFind && weight == weightToFind) {
            return _clusters[i];
        }
    }
    return undefined;
}

function displayTweetSentences(e) {
    var word = $(e.currentTarget).attr('value').split(',')[0];
    var cluster = getClickedCluster(e);
    $("#tweetSentences *").remove();

    $("#tweetSentences").append("<h4>Tweets about: " + word + "</h4>");
    for (var i = 0; i < cluster.clusteredSentences.length; i++) {
        $("#tweetSentences").append("<div class=\"row\"> " + cluster.clusteredSentences[i] + "</div>");
    }
}