const CLI = require("clui");
const fs = require("fs");
const axios = require("axios").default;
const _ = require("lodash");
const inquirer = require("./inquirer");
const path = require("path");
const prettier = require("prettier");
const shell = require("shelljs");

module.exports = {
  async getAllLicenses() {
    try {
      const licenses = [
        "none",
        "agpl-3.0",
        "apache-2.0",
        "bsd-2-clause",
        "bsd-3-clause",
        "bsl-1.0",
        "cc0-1.0",
        "epl-2.0",
        "gpl-2.0",
        "gpl-3.0",
        "lgpl-2.1",
        "mit",
        "mpl-2.0",
        "unlicense",
      ];
      return licenses;
    } catch (error) {
      console.log(chalk.red("Error occured: " + error.message));
    }
  },

  async checkIfFileExists(file) {
    const path = `${process.cwd()}\\${file}`;
    try {
      if (fs.existsSync(path)) {
        return true;
      }
    } catch (error) {
      console.log(chalk.red("Error occured: " + error.message));
    }
  },

  async generateLicense(options) {
    try {
      const response = await axios.get(
        `https://api.github.com/licenses/${options.license}`
      );

      if (response?.message == "Not Found") {
        return console.log(chalk.red("Wrong lincense"));
      }

      const data = response.data;

      let content = data.body;

      if (content.includes("[year]") && content.includes("[fullname]")) {
        content = content
          .replace("[year]", options.year)
          .replace("[fullname]", options.fullName);
      }
      fs.writeFileSync(path.join(options.targetDirectory, "LICENSE"), content);
    } catch (error) {
      throw new Error(error);
    }
  },

  async createGitignore(options) {
    try {
      const response = await axios.get(
        `https://api.github.com/gitignore/templates/${
          options.gitignore.charAt(0).toUpperCase() + options.gitignore.slice(1)
        }`
      );

      if (response?.message == "Not Found") {
        return console.log(chalk.red("Wrong gitignore type."));
      }

      const data = response.data;
      fs.writeFileSync(
        path.join(options.targetDirectory, ".gitignore"),
        data.source
      );
    } catch (error) {
      throw new Error(error);
    }
  },

  async createFormatterConfig(options) {
    let formatType;
    let config;
    switch (options.formatter.toLowerCase()) {
      case "prettier":
        formatType = ".prettierrc";
        break;
      case "eslint":
        formatType = ".eslintrc.json";
        break;
    }
    config = fs.readFileSync(__dirname + `/formatTypes/${formatType}`, "utf8");
    try {
      fs.writeFileSync(path.join(options.targetDirectory, formatType), config);
    } catch (error) {
      throw new Error(error);
    }
  },

  async createReadme(options) {
    try {
      const data = fs.readFileSync(__dirname + "/README.md", "utf8");

      fs.writeFileSync(path.join(options.targetDirectory, "README.md"), data);
    } catch (error) {
      throw new Error(error);
    }
  },

  async initilaztingNpm(options) {
    try {
      shell.exec("npm init -y -f", { silent: true });
    } catch (error) {
      throw new Error(error);
    }
  },

  async envpackage(options) {
    try {
      shell.exec("npm install dotenv", { silent: true });
    } catch (error) {
      throw new Error(error);
    }
  },

  async createEnvFile(options) {
    try {
      fs.writeFileSync(path.join(options.targetDirectory, ".env"), "PORT=3001");
    } catch (error) {
      throw new Error(error);
    }
  },
};
