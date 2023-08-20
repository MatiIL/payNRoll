/* tslint: disabled */
// @ts-nocheck

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();
const environment = argv.environment;

function setEnv() {
  fs = require('fs');
  writeFile = fs.writeFile;

  const environment = process.argv[2];

  // `environment.prod.json` file structure
  const envConfig = {
    production: environment === 'production', // Set production flag based on environment
    signupCode: process.env.SIGNUP_CODE || 'default-signup-code', // Use default if not provided
    openAiKey: process.env.OPENAI_KEY || 'default-openai-key', // Use default if not provided
  };

  const targetPath = '/vercel/path1/src/environments/environment.prod.json'; // Adjust the path as needed

  console.log(
    `The file 'environment.prod.json' will be written with the following content:\n${JSON.stringify(
      envConfig,
      null,
      2
    )}`
  );

  writeFile(targetPath, JSON.stringify(envConfig, null, 2), function (err) {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.prod.json file generated correctly at ${targetPath}`
      );
    }
  });
}

setEnv();
/* tslint:enable */

/* tslint: enabled */
