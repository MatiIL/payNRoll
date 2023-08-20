/* tslint: disable */
// @ts-nocheck

const { writeFile, existsSync, mkdirSync } = require('fs');
const { argv } = require('yargs');
const fs = require('fs');


require('dotenv').config();

function setEnv() {
  writeFile = fs.writeFile;

  const environment = process.argv[2];

  // `environment.prod.json` file structure
  const envConfig = {
    production: environment === 'production', // Set production flag based on environment
    signupCode: import.meta.env.SIGNUP_CODE || 'default-signup-code', // Use default if not provided
    openAiKey: import.meta.env.OPENAI_KEY || 'default-openai-key', // Use default if not provided
  };

  const targetPath = '/vercel/path1/src/environment/environment.prod.json'; // Adjust the path as needed

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

/* tslint: enable */