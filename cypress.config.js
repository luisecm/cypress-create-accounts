const { defineConfig } = require("cypress");

module.exports = defineConfig({
  numTestsKeptInMemory: 0,
  pageLoadTimeout: 120000,
  defaultCommandTimeout: 10000,
  video: false,
  chromeWebSecurity: false,
  watchForFileChanges: false,
  waitForAnimations: false,
  animationDistanceThreshold: 50,
  e2e: {
    setupNodeEvents(on, config) {
      //require("cypress-localstorage-commands/plugin")(on, config)
      //return config
    },
    baseUrl: 'https://satellite-dev.on.fleek.co',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
