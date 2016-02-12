describe('JamminController', function() {

  var ctrl;
  beforeEach(module('Jammin'));

  beforeEach(inject(function($controller){
    console.log($controller)
    ctrl = $controller('JamminController');
  }));

  it('initializes statusLabel as not connected', function() {
    expect(ctrl.statusLabel).toEqual('not connected');
  });
});
