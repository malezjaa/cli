const inquirer = require("inquirer");
const files = require("./files");
const functions = require("./functions");
const axios = require("axios").default;

module.exports = {
  async devSetup() {
    return inquirer.prompt([
      {
        type: "list",
        name: "setup",
        message: "What do you want to do?",
        choices: ["Full Dev Setup"],
      },
    ]);
  },
  async getLicenseType() {
    const res = await functions.getAllLicenses();

    return inquirer.prompt([
      {
        type: "list",
        name: "license",
        message: "What license do you want to choose?",
        choices: res,
      },
    ]);
  },
  async gitIgnore() {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "gitignore",
        message: "Do you want to generate gitignore?",
      },
    ]);
  },
  async codeFormatter() {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "codeformatter",
        message: "Do you want to generate code formatter config?",
      },
    ]);
  },
  async codeFormatterType() {
    return inquirer.prompt([
      {
        type: "list",
        name: "codeformattertype",
        message: "What code formatter you want to use?",
        choices: ["Prettier", "Eslint"],
      },
    ]);
  },
  async createReadme() {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "readme",
        message: "Do you want to generate readme?",
      },
    ]);
  },
  async envFile() {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "envfile",
        message: "Do you want to env file?",
      },
    ]);
  },
  async initalizateNpm() {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "npm",
        message: "Do you want to inilatize npm?",
      },
    ]);
  },
  async installEnv() {
    return inquirer.prompt([
      {
        type: "confirm",
        name: "installenv",
        message: "Do you want to install env package?",
      },
    ]);
  },
  async getFullName() {
    return inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Provide full name for license.",
        validate: async (input) => {
          if (input == null || !input || input.length == 0) {
            return "Give your full name.";
          }

          return true;
        },
      },
    ]);
  },
  async gitIgnoreType(type) {
    return inquirer.prompt([
      {
        type: "input",
        name: "gitignoretype",
        message: "Provide gitignore type (eg. node).",
        validate: async (input) => {
          if (input == null || !input || input.length == 0) {
            return "Give gitignore type.";
          } else {
            try {
              const response = await axios.get(
                `https://api.github.com/gitignore/templates/${
                  input.charAt(0).toUpperCase() + input.slice(1)
                }`
              );

              if (response?.message == "Not Found") {
                return "Cannot find gitignore type";
              }
            } catch (error) {
              throw new Error(error);
            }

            return true;
          }
        },
      },
    ]);
  },
};
