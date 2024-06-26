# Cypress web automation
A practice automation project to test a web app with Cypress in Typescript

Test website https://www.automationexercise.com/
Credits to Arjun Thakur

## How to run Cypress tests
In the CLI, at the root folder run to open up the Cypress UI.
Select 'E2E Testing' then proceed with a preferred browser to the e2e test specs.
```
npm run cy:open
```

ALternatively, tests can run headless with respective target folders.
```
npm run cy:run // all e2e tests
npm run cy:run:api
npm run cy:run:smoke
npm run:regression
```