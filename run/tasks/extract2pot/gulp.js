'use strict';

/**
 * Finds all nested JS and HBS files (exluding the one which
 * sets up helpers) and passes the found paths into JSPot
 * for extraction.
 *
 * Example Usage:
 * gulp extract2pot
 *
 * Note: This can also be done directly from terminal.
 * node_modules/.bin/jspot extract --keyword=i18n --target=./locales ./js/src/*.js ./js/src/*.hbs
 */

var gulp = require('gulp'),
    glob = require('glob'),
    jspot = require('jspot');

gulp.task('extract2pot', function (done) {
    glob('./js/src/**/!(i18n-helper).+(js|hbs)', null, function(error, files) {
        jspot.extract({
            keyword: 'i18n',
            target: './locales',
            source: files
        });
    });
});