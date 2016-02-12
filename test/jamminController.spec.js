describe('JamminController', function() {
  beforeEach(module('Jammin'));

  it('initializes default values', function() {
    var ctrl;
    inject(function($controller, $rootScope){
      var scope = $rootScope.$new();
      ctrl = $controller('JamminController', {$scope: scope});
    });

    expect(ctrl.statusLabel).toEqual('not connected');
    expect(ctrl.otherUsers).toBeUndefined;
    expect(ctrl.validNickname).toEqual(false);
    expect(ctrl.nickname).toBeUndefined;
    expect(ctrl.metronomeStatus).toEqual('off');
  });

  var fakeSockets, fakeUsers;

  describe('when visiting jammin area', function() {
    beforeEach(function() {
      module(function ($provide) {
        fakeSockets = jasmine.createSpyObj('fakeSockets', ['setup']);
        $provide.factory('SocketFactory', function() {
          return fakeSockets;
        })
        fakeUsers = jasmine.createSpyObj('fakeUsers', ['createUser']);
        $provide.factory('UserFactory', function() {
            return fakeUsers;
        });
      });
    });

    beforeEach(inject(function($controller, $rootScope) {
      var scope = $rootScope.$new();
      ctrl = $controller('JamminController', {$scope: scope});
    }));

    beforeEach(function() {
      ctrl.startJammin();
    });

    it('sets up sockets', function() {
      expect(fakeSockets.setup).toHaveBeenCalled();
    });
  });

  describe('before visiting jamming area', function() {
    it('checks nickname and starts jamming', function() {
      spyOn(ctrl, 'startJammin');
      ctrl.checkNickname();
      expect(ctrl.validNickname).toEqual(true);
      expect(fakeUsers.createUser).toHaveBeenCalled();
      expect(ctrl.startJammin).toHaveBeenCalled();
    });
  });
});
