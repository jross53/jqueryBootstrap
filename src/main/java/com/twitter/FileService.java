package com.twitter;

import org.springframework.stereotype.Service;
import twitter4j.Logger;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

/**
 * Created by Jordan.Ross on 3/30/2017.
 */
@Service
public class FileService {

    Logger log = Logger.getLogger(FileService.class);

    public String getSampleTweetClustersWithDelayToEmulateCollectingTweets(final String tweet) {
        if(tweet == null) {
            return null;
        }

        String caseInsensitiveTweet = tweet.toLowerCase();
        try {
            Thread.sleep(1500);
        } catch (InterruptedException e) {
            log.error(e.getMessage());
        }
        switch (caseInsensitiveTweet) {
            case "angular":
                return getSampleAngularJson();
            case "android":
                return getSampleAndroidJson();
            case "apple":
                return getSampleAppleJson();
            case "microsoft":
                return getSampleMicrosoftJson();
            default:
                return null;
        }
    }

    private String getSampleAppleJson() {
        return getResourceFileContents("SampleAppleJson.txt");
    }

    private String getSampleAngularJson() {
        return getResourceFileContents("SampleAngularJson.txt");
    }

    private String getSampleAndroidJson() {
        return getResourceFileContents("SampleAndroidJson.txt");
    }

    private String getSampleMicrosoftJson() {
        return getResourceFileContents("SampleMicrosoftJson.txt");
    }

    private String getResourceFileContents(final String fileName) {
        StringBuilder result = new StringBuilder("");

        //Get file from resources folder
        ClassLoader classLoader = getClass().getClassLoader();
        File file = new File(classLoader.getResource(fileName).getFile());

        try (Scanner scanner = new Scanner(file)) {

            while (scanner.hasNextLine()) {
                String line = scanner.nextLine();
                result.append(line).append("\n");
            }

            scanner.close();

        } catch (IOException e) {
            log.error(e.getMessage());
        }

        return result.toString();
    }
}
