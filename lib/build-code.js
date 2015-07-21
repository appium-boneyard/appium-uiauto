
import path from 'path';
import _fs from 'fs';
import _ from 'lodash';
import B from 'bluebird';

let fs = {
  readFile: B.promisify(_fs.readFile)
};

let root = path.resolve(__dirname, '../uiauto');
// keep a list of files we examine for the purposes of making sure we're
// not adding the same file to the collated version twice
let filesExamined;

// this regex helps us get the file path of an import
let importRe = /^#import ('|")([^('|")]+)('|")$/mg;

async function getDepsForFile (file, extraImports = []) {
  if (_.contains(filesExamined, file)) {
    throw new Error(`Re-examining file ${file}; you need to make sure ` +
                    `the graph is set up so we don't require files twice`);
  }

  filesExamined.push(file);
  let data = await fs.readFile(file, 'utf8');
  let deps = {
    [file]: []
  };

  let matches = [];
  let match = importRe.exec(data);
  while (match) {
    if (match) {
      matches.push(match[2]);
    }
    match = importRe.exec(data);
  }
  if (extraImports && extraImports.length > 0) {
    matches = extraImports.concat(matches);
  }
 
  for (let importedFile of matches) {
    let importedPath = path.resolve(path.dirname(file), importedFile);
    let importedDeps = await getDepsForFile(importedPath);
    deps[file].push(importedDeps);
  }
  // recursively get dependencies for imported files
  return deps;
}

async function buildScriptFromDeps (deps) {
  let script = '';
  for (let [file, subDepsArray] of _.pairs(deps)) {
    //console.log('array' + subDepsArray);
    for (let subDeps of subDepsArray) {
      script += await buildScriptFromDeps(subDeps);
    }  
    let fileContents = await fs.readFile(file, 'utf8');
    let newFileData = stripImports(fileContents);
    
    let fileWithoutRoot = file.replace(`${root}/`, '');
    script += `\n/* begin file: ${fileWithoutRoot} */\n`;
    script += newFileData;
    script += `\n/* end file: ${fileWithoutRoot} */\n`;
  }
  return script;
}

function stripImports (data) {
  data = data.replace(importRe, "");
  data = data.trim();
  return data;
}

async function buildScript (entryPoint, extraImports) {
  
  filesExamined = [];
  let deps = await getDepsForFile(entryPoint, extraImports);
  let script =  await buildScriptFromDeps(deps);
  return script;
}

export default buildScript;