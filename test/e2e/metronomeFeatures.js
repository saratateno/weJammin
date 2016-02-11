describe("Metronome", function() {
  var title
  var metbutton = element(by.binding('metronome.status'))

  beforeAll(function() {
    browser.get('http://localhost:8080');
    title = browser.getTitle();
  });

  // test that metronome starts upon opening the page

  it('has a metronome running', function() {
    expect(metbutton.getText()).toEqual("On");
  });
})
