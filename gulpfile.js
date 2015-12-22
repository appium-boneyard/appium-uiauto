"use strict";

var gulp = require('gulp'),
    boilerplate = require('appium-gulp-plugins').boilerplate.use(gulp);

boilerplate({
  files: ["*.js", "lib/**/*.js", "test/**/*.js", "!gulpfile.js", "!test/assets/**/*.js"],
  build: 'appium-uiauto',
  jscs: false,
  testTimeout: 60000,
  testReporter: 'spec',
  testRequire: ['./build/test/logsink']
});
