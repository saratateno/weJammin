describe('User Presence Features', function() {
  var nameInput, enterButton, currentUser, otherUsers;

  beforeAll(function() {
    browser.get('http://localhost:8080');
    nameInput = element(by.id('playerNameInput'));
    enterButton = element(by.id('enterButton'));
    currentUser = element(by.id('currentUser'));
    otherUsers = element(by.id('otherUsers'));
  });

  it('asks for nickname and displays it when you click enter', function() {
    nameInput.sendKeys('Joe B');
    enterButton.click();
    expect(currentUser.getText()).toEqual('Joe B')
  });

  it('asks for nickname and displays it when you click enter', function() {
    // nameInput.sendKeys('Joe B');
    // enterButton.click();
    browser.get('http://localhost:8080');
    nameInput.sendKeys('charlie');
    enterButton.click();
    expect(currentUser.getText()).toEqual('charlie');
    expect(otherUsers.getText()).toEqual('Joe B');
  });
});
