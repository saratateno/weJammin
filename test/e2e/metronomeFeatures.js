describe("Metronome", function() {
  var title
  var metbutton = element(by.binding('metronomeStatus'))

  beforeAll(function() {
    browser.get('http://localhost:8080');
    title = browser.getTitle();
  });

  // test that metronome starts upon opening the page

  it('has a metronome running', function() {
    expect(metbutton.getText()).toEqual("on");
  });

  it('can turn a metronome off', function() {
    element(by.css('[ng-click="JCtrl.toggleMetronome()"]')).click();
    expect(metbutton.getText()).toEqual("off");
  });
})
