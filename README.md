# multi-armedbandit_backend
Simple backend written in nodejs for multi-armed bandit test implementation. Runs on simple mongodb database. Done to experiment with how the algorithm will balance over time.

Find the frontend here: https://github.com/bassijtsma/multi-armedbandit_frontend

To set it up ensure the correct value is set for the mongodb location in the config file.

```
'mongoUrl' : 'mongodb://localhost:27017/test'
```

Entry is in app.js. Exposes four endpoints:


1. GET: /statistics:
Will fetch and return the colors from the db and their respective number of clicks and views. Will calculate the average conversion for each color.

3. GET /reinitialize
resets the database values, works for initializing. Will insert three colors, all with 0 views and 0 clicks.

4. GET /color
Perform the multi-armed bandit algorithm based on the results and update the db to reflect the pageview.

4. PUT /clickcount/<colorvalue>
Call to update the click count for the respective color.
