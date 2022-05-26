module.exports = {
  async getOption(option) {
    if (option.includes("full")) {
      return "fullSetup";
    }
  },
};
