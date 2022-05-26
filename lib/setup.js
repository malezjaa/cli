const functions = require("./functions");
const ora = require("ora");

module.exports = {
  async fullSetup(
    license,
    gitignore,
    formatter,
    readme,
    npm,
    envpackage,
    envfile,
    name,
    year
  ) {
    let options = {
      //...options,
      targetDirectory: process.cwd(),
      license: license,
      gitignore: gitignore,
      readme: readme,
      npm: npm,
      formatter: formatter,
      envpackage: envpackage,
      envfile: envfile,
      fullName: name,
      year: year,
    };

    if (license && license != "none") {
      const status = ora("Creating license file...").start();

      try {
        await functions.generateLicense(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }

    if (gitignore) {
      const status = ora("Creating gitignore file...").start();

      try {
        await functions.createGitignore(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }

    if (formatter) {
      const status = ora("Creating formatter file...").start();

      try {
        await functions.createFormatterConfig(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }

    if (readme) {
      const status = ora("Creating readme file...").start();

      try {
        await functions.createReadme(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }

    if (npm) {
      const status = ora("Initilazting npm.").start();

      try {
        await functions.initilaztingNpm(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }

    if (envpackage && npm) {
      const status = ora("Dowlanding env package...").start();

      try {
        await functions.envpackage(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }

    if (envfile && envpackage) {
      const status = ora("Creating env file...").start();

      try {
        await functions.createEnvFile(options);
      } catch (error) {
        throw new Error(error);
      } finally {
        status.succeed;
        status.stop();
      }
    }
  },
};
