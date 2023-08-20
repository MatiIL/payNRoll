/* tslint: disabled */
// @ts-nocheck

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function setEnv() {
  fs = require("fs");
  writeFile = fs.writeFile;
  // Configure Angular `environment.prod.json` file path
  targetPath = "/vercel/path1/src/environment/environment.prod.json";
  targetPath2 = "/vercel/path2/src/environment/environment.prod.json";

  // `environment.prod.json` file structure
  envConfigFile = process.env.FIREBASE;

  console.log(
    "The file `environment.prod.json` will be written with the following content: \n"
  );
  writeFile(targetPath, envConfigFile, function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        "Angular environment.prod.json file generated correctly at" +
          targetPath +
          "\n"
      );
    }
  });
  writeFile(targetPath2, envConfigFile, function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        "Angular environment.prod.json file generated correctly at" +
          targetPath +
          "\n"
      );
    }
  });
}

setEnv();
/* tslint:enable */


/* tslint: enabled */