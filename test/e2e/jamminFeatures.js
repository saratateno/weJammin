describe('Jammin', function() {
  var nameInput, enterButton, title, pageHeader, statusLabel;

  beforeAll(function() {
    browser.get('http://localhost:8080');
    nameInput = element(by.id('playerNameInput'));
    enterButton = element(by.id('enterButton'));
    nameInput.sendKeys('Joe B');
    enterButton.click();

    title = browser.getTitle();
    pageHeader = element(by.className('page-header')).getText();
    statusLabel = element(by.binding('statusLabel')).getText();
  });

  it('has a title', function() {
    expect(title).toEqual('Jammin');
    expect(pageHeader).toEqual('We Jammin');
  });

  it('registers a connection', function() {
    browser.get('http://localhost:8080');
    nameInput.sendKeys('Joe B');
    enterButton.click();
    expect(statusLabel).toEqual('connected');
  });
});
