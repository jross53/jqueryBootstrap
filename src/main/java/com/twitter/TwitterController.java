package com.twitter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import twitter4j.Logger;

@RestController
@RequestMapping("/twitter")
public class TwitterController 
{

    @Autowired
    Twitter twitter;
    @Autowired
    TwitterClustering twitterClustering;
    private static final Logger log = Logger.getLogger(Twitter.class);

    /***
     * Method to Get the Tweets
     * @param tweet String tweet
     * @return {@link String}
     */
    @RequestMapping("/getTweets")
    public String getTweets(@RequestParam(value="tweet") String tweet)
    {

        log.info("Collecting tweets for: " + tweet);
        return twitterClustering.GetClusteredXMLFromStringArray(twitter.collectTweets(tweet));
    }
}
