describe('JamminController', function() {

  var ctrl;

  beforeEach(module('Jammin'));

  beforeEach(inject(function($controller, $rootScope){
    var scope = $rootScope.$new();
    ctrl = $controller('JamminController', {$scope: scope});
  }));

  it('initializes statusLabel as not connected', function() {
    expect(ctrl.statusLabel).toEqual('not connected');
  });

});
