# Java-Final-Project

For this project we made a Java application that collects and clusters tweet information from a Twitter API.

To run the application:
1. Open a command prompt in the same directory as the javaFinalProject.war (in the Documentation folder)
2. Run the following command: java -jar javaFinalProject.war
3. You should see some output in the command prompt as the application should be starting up. When you see "Started Application in xx.xx seconds" the application is running

To download a copy of the project to run in an IDE:
1. To run the application you need Java and Maven installed and paths added as system variables
2. You need to have git installed or have a zip file of the project
Steps for git:
   * Create a directory for the project
   *  Execute command 'git init' in that directory
   *   Execute command 'git clone https://github.com/jross53/jqueryBootstrap.git'
   *   After Maven downloads the dependencies for the project it is ready to run

# Using the application
In your browser (preferrably Google Chrome) navigate to localhost:8080 to bring up the main page. You can now select one of the categories of tweets. A word cloud will appear containing common words in the received tweets. Select one of the words in the word cloud and you will see all the tweets pertaining to the word you clicked.

# About the application
For the back end we used Spring Boot. For the front end we used jQuery and Bootstrap. 
