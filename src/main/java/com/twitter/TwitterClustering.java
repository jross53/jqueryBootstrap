package com.twitter;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.stereotype.Service;
import twitter4j.Logger;;
import java.util.HashSet;
import java.util.Iterator;

@Service
public class TwitterClustering
{
    private static final Logger log = Logger.getLogger(Twitter.class);

    /***
     * This Method takes in the tweet Hashset and then uses a clustering API to
     * cluster the tweets
     * @param tweets HashSet of tweets.
     * @return {@link String}
     */
    public String GetClusteredXMLFromStringArray(HashSet<String> tweets)
    {
        log.info("Getting clusters using the cluster API.");
        try
        {
            HttpResponse<String> response= Unirest.post("http://findilike.linkpc.net:9000/generateClusters ")

                    .header("X-Mashape-Key", "jA9lFVmAMFmshxRrfSrCYEL1XUDIp1h8cRsjsnvTlYNlUuvtAO")
                    .header("Content-Type", "application/json")
                    .header("Accept", "application/json")
                    .body("{\"type\": \"pre-sentenced\",\"text\":[" + getFormattedStringFromHashSet(tweets) + "]}")
                    .asString();

            String body = response.getBody();
            if(body.contains("Bad request"))
            {
                log.error("There was an issue calling the clustering api: \n\n" + response.getBody().trim());
                log.error("\nTHESE ARE THE TWEETS: \n");
                for(String tweet : tweets)
                {
                    log.error(tweet);
                }
            }

            return body;
        }
        catch (UnirestException e)
        {
            e.printStackTrace();
            return null;
        }
    }

    /***
     * This Method Gets a Formatted String from a HashSet.
     * @param myHashSet HashSet
     * @return {@link String} formatted String
     */
    private String getFormattedStringFromHashSet(HashSet<String> myHashSet)
    {
        log.info("Formatting the tweet hashSet.");
        StringBuilder myString = new StringBuilder();
        String sentence = "";

        // Make an iterator and iterate over contents
        Iterator iterator = myHashSet.iterator();

        if (iterator.hasNext())
        {
            while (iterator.hasNext() && (sentence = iterator.next().toString()).equals(""))
            {
                //Moving On...
            }
            myString.append("{\"sentence\":\"").append(sentence).append("\"}");
        }

        while (iterator.hasNext())
        {
            if (!(sentence = iterator.next().toString()).equals(""))
            {
                myString.append(",{\"sentence\":\"").append(sentence).append("\"}");
            }
        }

        return myString.toString();
    }
}
