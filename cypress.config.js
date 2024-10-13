const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://practice.expandtesting.com/notes/app",
    env: {
      apiUrl: "https://practice.expandtesting.com/notes/api",
      email: "valid.user@example.com.br",
      password: "validpassword123"
    },
    reporter: "mochawesome",
    reporterOptions: {
      reportDir: "cypress/reports",
      overwrite: false,
      html: true,
      json: true
    },
    viewportHeight: 1080,
    viewportWidth: 1920,
    video: true,
    screenshotOnRunFailure: true
  }
});
