describe('Socket connections', function() {
  var Server = require('socket.io');

  beforeEach(function(done) {
    var that = this;
    this.io = Server(3800);
    this.io.on('connection', function (socket) {
      that.activeSocket = socket;
      done();
    });
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

  afterEach(function (done) {
    this.io.close();
    this.activeSocket.on('disconnect', function () {
      done();
    });
  })
});
