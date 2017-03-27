# Blue Acorn - Smyth Group - CucumberJS BDD Spike

Home of CucumberJS / selenium environment and scenarios to demonstrate BDD.

# Dependencies

You will need a working Java JDK. 
- On OSX `brew cask install java` will get you one.
- On Windows you will need to download and install a recent JDK library for your OS.

# Installation
- Get the required global dependencies: `npm install -g grunt-cli phantomjs cucumber@1.3.1`
- Get the local dependencies: `npm install`
- Ensure Selenium drivers are present: `./node_modules/.bin/selenium-standalone install`

# Commands

Start the Selenmium server:
- `./node_modules/.bin/selenium-standalone start`

- `cucumberjs -p default` (run all tests)
- `cucumberjs -p [features]/[feature_folder]` (run specific test)
- `grunt pickles` (run the tests and output the pickles site)
