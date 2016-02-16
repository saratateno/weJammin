var webdriver = require('selenium-webdriver');
var protractor = require('protractor');

//create a driver which starts a chrome browser
var driver1 = new webdriver.Builder()
  .usingServer('http://localhost:4444/wd/hub')
  .withCapabilities(webdriver.Capabilities.chrome()).build();
driver1.manage().timeouts().setScriptTimeout(15000);

//create another driver which starts a firefox browser
var driver2 = new webdriver.Builder()
  .usingServer('http://localhost:4444/wd/hub')
  .withCapabilities(webdriver.Capabilities.firefox()).build();
driver2.manage().timeouts().setScriptTimeout(15000);

var browser1 = protractor.wrapDriver(driver1);
var browser2 = protractor.wrapDriver(driver2);

describe('User Presence Features', function() {
  var nameInput1, enterButton1, currentUser1, otherUsers1;
  var nameInput2, enterButton2, currentUser2, otherUsers2;

  beforeAll(function() {
    browser1.get('http://localhost:8080');
    browser2.get('http://localhost:8080');
    nameInput1 = browser1.findElements(protractor.By.id('playerNameInput'));
    enterButton1 = browser1.findElements(protractor.By.id('enterButton'));
    currentUser1 = browser1.findElements(protractor.By.id('currentUser'));
    otherUsers1 = browser1.findElements(protractor.By.id('otherUsers'));
    nameInput2 = browser2.findElements(protractor.By.id('playerNameInput'));
    enterButton2 = browser2.findElements(protractor.By.id('enterButton'));
    currentUser2 = browser2.findElements(protractor.By.id('currentUser'));
    otherUsers2 = browser2.findElements(protractor.By.id('otherUsers'));
  });

  afterAll(function() {
    driver1.quit();
    driver2.quit();
  });

  xit('asks for nickname and displays it when you click enter', function() {
    nameInput1.then(sendKeys('Joe B'));
    enterButton1.click();
    expect(currentUser1.getText()).toEqual('Joe B')
  });

  xit('asks for nickname and displays it when you click enter', function() {
    nameInput2.sendKeys('charlie');
    enterButton2.click();
    expect(currentUser2.getText()).toEqual('charlie');
    expect(otherUsers2.getText()).toContain('Joe B');
  });
});
