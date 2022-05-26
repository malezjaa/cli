#!/usr/bin/env node

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");

const files = require("./lib/files");
const inquirer = require("./lib/inquirer");
const options = require("./lib/options");
const functions = require("./lib/functions");
const setup = require("./lib/setup");

clear();

console.log(
  chalk.yellow(figlet.textSync("DevSetup", { horizontalLayout: "full" }))
);

const run = async () => {
  try {
    const setupOption = await inquirer.devSetup();
    const option = await options.getOption(setupOption.setup.toLowerCase());

    switch (option) {
      case "fullSetup":
        const licenseType = await inquirer.getLicenseType();
        if (licenseType.license && licenseType.license != "none") {
          global.fullName = await inquirer.getFullName();
        }
        const gitIgnore = await inquirer.gitIgnore();
        if (gitIgnore.gitignore) {
          global.gitIgnoreType = await inquirer.gitIgnoreType();
        }
        const codeFormatter = await inquirer.codeFormatter();
        if (codeFormatter.codeformatter) {
          global.codeFormatterType = await inquirer.codeFormatterType();
        }
        const createReadme = await inquirer.createReadme();
        const npmStatus = await functions.checkIfFileExists("package.json");
        if (npmStatus != true) {
          global.initalizateNpm = await inquirer.initalizateNpm();
          if (initalizateNpm.npm) {
            global.installEnv = await inquirer.installEnv();

            if (installEnv.installenv) {
              global.envFile = await inquirer.envFile();
            }
          }
        }
        const date = new Date();
        const year = date.getFullYear();
        let fullName;
        if (licenseType) {
          fullName = fullName?.name ? fullName?.name : false;
        } else {
          fullName = "undefined";
        }
        await setup.fullSetup(
          licenseType.license ? licenseType.license : false,
          gitIgnore ? gitIgnoreType.gitignoretype : false,
          codeFormatter ? codeFormatterType.codeformattertype : false,
          createReadme.readme ? createReadme.readme : false,
          initalizateNpm.npm ? initalizateNpm.npm : false,
          installEnv.installenv ? installEnv.installenv : false,
          envFile.envfile ? envFile.envfile : false,
          fullName,
          year
        );
        break;
    }

    console.log(chalk.green("All done!"));
  } catch (err) {
    if (err) {
      switch (err.status) {
        default:
          console.log(chalk.red(err));
      }
    }
  }
};

run();
