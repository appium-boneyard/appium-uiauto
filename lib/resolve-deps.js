"use strict";

var path = require('path'),
    fs = require('fs'),
    _ = require('underscore'),
    root = path.resolve(__dirname, "../uiauto");

// keep a list of files we examine for the purposes of making sure we're
// not adding the same file to the collated version twice
var filesExamined;

// this regex helps us get the file path of an import
var importRe = /^#import ('|")([^('|")]+)('|")$/mg;

var getDepsForFile = function (file, extraImports) {
  if (_.contains(filesExamined, file)) {
    throw new Error("Re-examining file " + file + "; you need to make sure " +
                    "the graph is set up so we don't require files twice");
  }
  filesExamined.push(file);
  var data = fs.readFileSync(file).toString('utf8');
  var deps = {};
  deps[file] = [];
  var matches = [];
  var match = importRe.exec(data);
  while (match) {
    if (match) matches.push(match[2]);
    match = importRe.exec(data);
  }
  if (extraImports && extraImports.length > 0) {
    matches = extraImports.concat(matches);
  }
  if (matches.length > 0) {
    _.each(matches, function (importedFile) {
      var importedPath = path.resolve(path.dirname(file), importedFile);
      // recursively get dependencies for imported files
      deps[file].push(getDepsForFile(importedPath));
    });
  }
  return deps;
};

var buildScriptFromDeps = function (deps) {
  // when building the actual script we need to go as deep as we can first
  // to make sure the dependencies are available for code later on in
  // the resulting file
  var script = "";
  _.each(deps, function (subDepsArray, file) {
    if (subDepsArray.length > 0) {
      _.each(subDepsArray, function (subDeps) {
        script += buildScriptFromDeps(subDeps);
      });
    }
    // add the actual code to our big script var
    var newFileData = stripImports(fs.readFileSync(file).toString('utf8'));
    var fileWithoutRoot = file.replace(root + '/', '');
    script += "\n/* begin file: " + fileWithoutRoot + " */\n";
    script += newFileData;
    script += "\n/* end file: " + fileWithoutRoot + " */\n";
  });
  return script;
};

var stripImports = function (data) {
  data = data.replace(importRe, "");
  data = data.trim();
  return data;
};


module.exports = function (entryPoint, extraImports) {
  filesExamined = [];
  var deps = getDepsForFile(entryPoint, extraImports);
  var script = buildScriptFromDeps(deps);
  return script;
};
