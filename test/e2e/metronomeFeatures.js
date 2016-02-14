describe("Metronome", function() {
  var nameInput, enterButton, metStatus, metButton;

  beforeAll(function() {
    browser.get('http://localhost:8080');
    nameInput = element(by.id('playerNameInput'));
    enterButton = element(by.id('enterButton'));
    nameInput.sendKeys('Joe B');
    enterButton.click();

    metStatus = element(by.binding('metronomeStatus'));
    metButton = element(by.id('metButton'));
  });

  it('has a metronome running', function() {
    expect(metStatus.getText()).toEqual("on");
  });

  it('can turn a metronome off', function() {
    metButton.click();
    expect(metStatus.getText()).toEqual("off");
  });
})
