describe('JamminController', function() {
  beforeEach(module('Jammin'));

  it('initializes statusLabel as not connected', function() {
    var ctrl;
    inject(function($controller, $rootScope){
      var scope = $rootScope.$new();
      ctrl = $controller('JamminController', {$scope: scope});
    });

    expect(ctrl.statusLabel).toEqual('not connected');
  });


  describe('when visiting the page', function() {
    beforeEach(function() {
      module(function ($provide) {
        fakeSockets = jasmine.createSpyObj('fakeSockets', ['setup']);
        $provide.factory('SocketFactory', function() {
          return fakeSockets;
        })
      })
    });

    beforeEach(inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      ctrl = $controller('JamminController', {$scope: scope});
    }));

    it('sets up sockets', function() {
      expect(fakeSockets.setup).toHaveBeenCalled();
    });
  });
});
