"use strict";

var gulp = require('gulp'),
    boilerplate = require('appium-gulp-plugins').boilerplate.use(gulp);

boilerplate({
  build: 'appium-uiauto',
  jscs: false,
  testTimeout: 60000
});
