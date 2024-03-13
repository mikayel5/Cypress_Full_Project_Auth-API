const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'x84x5h',
  chromeWebSecurity: false,
  defaultCommandTimeout: 15555,
  pageLoadTimeout: 3555,
  e2e: {
    baseUrl:'https://www.webdriveruniversity.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    webdriver_homepage:'https://www.webdriveruniversity.com',
    first_name: "Mik",
  },
});
