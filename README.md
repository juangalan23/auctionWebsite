# auctionWebsite

Welcome to my auction website prototype, which was created for the company Ed Microlearning.  

The prompt was to create a simple auction website where people can see a list of items and bid on them.
Each item has an end date and time at which it will be sold to the highest bidder at that time, if there are any bidders.

The tech stack:
On the front end:
- React JS Framework
- Material UI for styling and user interface

On the backend: 
- Node
- Express
- MongoDB (Mongoose)

To view the application, please follow the instructions below:
- First, please make sure you have Node/NPM, MongoDB, and Mocha installed globally on your computer
- Fork the repo to your personal Github account and clone the repository into your local computer
- In the terminal, navigate to the root of the project (note: you will need a few terminal tabs open)
- Once in the root of the project, run the command npm install
- From there, run each of the following commands in a separate terminal tab, and leave them open
    - npm run react-dev
    - mongod
    - mongo
    - npm run server-dev
    - mocha
- Once you have all of those commands running, open up Chrome and navigate to http://localhost:3000/ and feel free to log-in.
To know the log-in credentials, view them in the file dummyData/users.js


Important to note: running mocha is the command to run the tests for my application, but it is also the command that populates the mongoDB database with dummy data.
If running the command 'mocha' doesn't populate the database, it will be difficult to run the app, so please let me know and we'll work it out.

Enjoy! Looking forward to discussing the prototype in more detail.


Cheers