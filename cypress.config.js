const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
    "chromeWebSecurity": false,
    "defaultCommandTimeout": 15555,
    "pageLoadTimeout": 3555,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  
});
