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

   it('registers a connection', function() {
    browser.get('http://localhost:8080');
    var statusLabel = element(By.binding('statusLabel'));
    expect(statusLabel.getText()).toBe('connected');
  });

  it('registers a second connection', function() {
    browser.get('http://localhost:8080');
    var statusLabel = element(By.binding('statusLabel'));
    expect(statusLabel.getText()).toBe('connected');
  });
});
