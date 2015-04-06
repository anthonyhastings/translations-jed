'use strict';

// Loading dependencies.
var fs = require('fs'),
    _ = require('underscore'),
    express = require('express'),
    bodyParser = require('body-parser');

// Instantiating the framework and a router for our requests.
var app = express(),
    router = express.Router();

// The port which this script will listen to.
var apiPort = 4000;

// Application parses request bodies: application/json, application/x-www-form-urlencoded, and multipart/form-data.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handler for all requests. Responses are given CORS headers before calling any other handlers.
router.use(function(request, response, next) {
    console.log('Request:', 'GET', request.originalUrl);
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    next();
});

// Route: Sends back locale specific data.
router.get('/translations/:localeCode', function(request, response) {
    fs.readFile('../locales/' + request.params.localeCode + '.json', function(error, data) {
        response.type('application/json');
        response.send((error) ? '{ "error": "File not found." }' : data);
    });
});

// Associate the router with our application, and prefix the routes.
app.use('/api', router);

// Listen for the above routes on the following port.
app.listen(apiPort);

// Debugging to the console that the server has started.
console.log('Mock API Server: http://localhost:' + apiPort + '/');