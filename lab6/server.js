'use strict';

//Dependencies

//Require triggers the dotenv mode nodule to export to this file in the form of an object. the config method then establishes the user environment by parsing variables from the .env file.

require('dotenv').config();

//Simililary to the example above this next line exports the express module to this file and stores it in a variable express.
const express = require('express');

//cors is a node module to prevent cross-origin scripting
const cors = require('cors');

//Define app
const app = express();

//Cors must be INVOKED
app.use(cors());

//Routes
app.get('/', (request,response) => response.send('You made it!'));

app.get('/test', (req, res) => res.send('testing testing 123'));

//Start listening, think about this like an event listener(the whole server code) attached to the port
//A node http.Server is returned
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
