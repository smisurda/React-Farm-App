1) Instructions on how to run application and tests
After checking out my version of the project, please navigate to the directory root (ReactFarm-App/farm-app-fullstack), and execute the following steps:
	npm install
	npm start

In a browser, load the page here: 
localhost:3000

To run the Jest test suite, enter npm test in a terminal window. Note, Jest will not run with an older version of Node. If you are experiencing difficulty running the tests, consider using NVM to update your version temporarily. 

---

2) Assumptions and considerations for design choices
I heavily leveraged Material UI in order to rapidly prototype a reasonable looking front-end. Although I like the look of MUI, applying a theme to better match the company's branding would be preferable. 

In terms of creating components, I decided to have each MVP item be its own component in its own file. Although this lends itself to a lot of repeated React boilerplate, I think it creates a separation of concerns that could be better cleaned up later -- again in the spirit of rapid prototyping. 

Much of the revenue code could be extended to handle larger numbers. At this time, the maximum value seems to fall around 3 million. Writing an endpoint to calculate the min and max of our data set to produce the range dynamically could also be used.

---
3) Future direction if you had time to work on project for 1 more day? 1 more week?
- One of the first steps would be to extend the API's functionality, and corresponding test suite. 

- I did not add UI tests in the interest of time. I'm not a huge fan of component based testing in general, and find it to be clunky, brittle and less useful than a simple manual, eyeball test. Nevertheless, it does have a place, and can be a good defense when monitoring UI changes on every screen of an application is untenable. 

- The UX for the slider could definitely be improved. A conversation about the appropriate step values with a business expert would be helpful. 

- An additional problem I noticed was that the search box and the revenue slider do not work together. In order to combine their filtering abilities, some kind of set union of their results set could be used.
