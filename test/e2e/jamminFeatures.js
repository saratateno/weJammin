describe('Jammin', function() {
  var title = browser.getTitle();
  var pageHeader = element(by.className('page-header')).getText();

  beforeAll(function() {
    browser.get('http://localhost:8080');
  });

  it('has a title', function() {
    expect(title).toEqual('Jammin');
    expect(pageHeader).toEqual('Jammin');
  });
});
