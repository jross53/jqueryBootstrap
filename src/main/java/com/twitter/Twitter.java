package com.twitter;

import org.springframework.stereotype.Service;
import twitter4j.*;
import twitter4j.conf.ConfigurationBuilder;
import java.util.HashSet;


@Service
public class Twitter
{
    private static final Logger log = Logger.getLogger(Twitter.class);
    private HashSet<String> tweets;
    private int count;
    private long minId;

    /***
     * Returns the Count of the Tweets.
     * @return {@link HashSet} tweets
     */
    public HashSet<String> getTweetSet()
    {
        return tweets;
    }

    /***
     * Returns the Count of the Tweets.
     * @return {@link Integer} Count
     */
    public int getCount()
    {
        return count;
    }

    /***
     * Public method to collect the tweets.
     * @param query String word to collect.
     * @return String result
     */
    public HashSet<String> collectTweets(String query)
    {
        tweets = new HashSet<>();
        count = 0;
        minId = -1;

        log.info("Authenticating with Twitter.");
        for(int i = 0; i < 10; i++) //this gets 100 tweets each iteration
        {
            authenticateAndPrintTweets(query);
        }
        log.info("Gathering Tweets Completed.");

        return tweets;
    }

    /***
     * Method to Authenticate and Print the Tweets.
     * @param twitterQuery String word to collect.
     */
    private void authenticateAndPrintTweets(String twitterQuery)
    {
        ConfigurationBuilder cb = new ConfigurationBuilder()
                .setDebugEnabled(true)
                .setOAuthConsumerKey("as8BKrmvueLiF1FbeeA3nIqR2")
                .setOAuthConsumerSecret("rypFGFTyPozJxoiUIatx1wTuUXmxqUoj71xbf6YqfyRVhqioCw")
                .setOAuthAccessToken("3871386372-7sb8AAqfzBZqxRTSPAGIho5dGcw4Q8umSlWKVgd")
                .setOAuthAccessTokenSecret("orOaHmsGM6shkRyMJYjg7YfJ3tHD1wtZ9BSFG3R61eVPI");

        TwitterFactory tf = new TwitterFactory(cb.build());
        twitter4j.Twitter twitter = tf.getInstance();
        Query query = new Query(twitterQuery);
        query.setCount(500);
        if(minId != -1)
        {
            query.setMaxId(minId - 1);
        }

        QueryResult queryResult = null;
        try
        {
            queryResult = twitter.search(query);
        }
        catch (TwitterException e)
        {
            e.printStackTrace();
        }

        if (queryResult != null)
        {
            for (Status status : queryResult.getTweets())
            {
                log.debug(formatString(status.getText()));
                tweets.add(formatString(status.getText()));
                count++;

                long currentId = status.getId();
                if(currentId < minId || minId == -1)
                {
                    minId = currentId;
                }
            }
            log.info("Number of Tweets: " + count);
        }
    }

    /***
     * Method to filter the received tweets into a format that is usable.
     * @param str String tweet
     * @return String formatted tweet.
     */
    private String formatString(String str)
    {
        String retweet = "RT:?\\s@[a-zA-Z0-9_]+:?\\s?"; //filter out first round of retweets
        String link = "(http[:/.\\w]+)"; //filter out links
        String retweet2 = "RT:? [a-zA-Z0-9_]+:? "; //filter out second round of retweets
        String userName = "(@)\\w+"; //filter out any remaining usernames: "@example"
        String removeNonASCII = "[^\\x00-\\x7F]"; // filter out any non ASCII characters
        String tab = "\t";
        String slash = "\\\\";
        String nonTextChars = "[!/\'\"#$%^?+:=&*~<>()_-]"; //filter out the majority of nonalphanumeric chars
        String bracks = "[\\[\\.\\],]"; //filter out brackets, commas, and periods
        String newLine = "[\\r|\\n]"; // filter out the line breaks

        log.debug("Formating the Tweet.");
        str = str.replaceAll(link, "");
        str = str.replaceAll(retweet, "");
        str = str.replaceAll(retweet2, "");
        str = str.replaceAll(userName, "");
        str = str.replaceAll(removeNonASCII, "");
        str = str.replaceAll(nonTextChars, "");
        str = str.replaceAll(bracks, "");
        str = str.replaceAll(tab, "");
        str = str.replaceAll(slash, "");
        str = str.replaceAll(newLine, " ");
        str = str.trim();
        str = str.toLowerCase();

        return str;
    }

}
