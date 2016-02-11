describe('Jammin', function() {

  beforeAll(function() {
    browser.get('http://localhost:8080');
    title = browser.getTitle();
    pageHeader = element(by.className('page-header')).getText();
  });

  it('has a title', function() {
    expect(title).toEqual('Jammin');
    expect(pageHeader).toEqual('Jammin');
  });
});
