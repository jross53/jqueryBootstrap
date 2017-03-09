package com.twitter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan
public class Application
{

    /***
     * Main Method for Server Execution
     * @param args arguments
     */
    public static void main(String[] args)
    {
        SpringApplication.run(Application.class, args);
    }
}
