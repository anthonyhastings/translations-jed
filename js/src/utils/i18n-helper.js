'use strict';

// Loading dependencies.
var Jed = require('jed'),
    Handlebars = require('hbsfy/runtime');

// Creating a shareable object with the Jed instance on it.
var helper = {
    Jed: Jed,
    i18n: new Jed({}),
    store: {}
};

module.exports = helper;