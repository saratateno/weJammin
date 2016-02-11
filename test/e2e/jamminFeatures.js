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
