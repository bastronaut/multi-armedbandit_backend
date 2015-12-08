# multi-armedbandit_backend
Simple backend written in nodejs for multi-armed bandit test implementation. Runs on simple mongodb database.

To set it up ensure the correct value is set for the mongodb location. This is done in dbconnection.js in the 'url' variable.

Entry is in app.js. Exposes three endpoints:

1. /getStatistics:
Will fetch and return the colors from the db and their respective number of clicks and views. Will calculate the average conversion for each color, perform the multi-armed bandit algorithm based on the results and update the db to reflect the pageview.

2. /updateClickCount/<colorvalue>
Called whenever a button was clicked to update the click count for the respective color.

3. /reinitialize
resets the database values, works for initializing. Will insert three colors, all with 0 views and 0 clicks.
