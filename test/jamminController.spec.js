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

  // SOCKETS

  var fakeSockets, fakeUsers, fakeMetronome;

  describe('when visiting jammin area', function() {
    beforeEach(function() {
      module(function ($provide) {
        fakeUsers = jasmine.createSpyObj('fakeUsers', ['createUser', 'otherUsers']);
        $provide.factory('UserFactory', function() {
          return fakeUsers;
        });
        fakeMetronome = jasmine.createSpyObj('fakeMetronome', ['toggleMetronome']);
        $provide.factory('MetronomeFactory', function() {
          return fakeMetronome;
        });
      });
    });



    beforeEach(inject(function($controller, $rootScope, socketFactory) {
      var scope = $rootScope.$new();
      fakeSockets = socketFactory();
      ctrl = $controller('JamminController', {$scope: scope});
    }));

    beforeEach(function() {
      ctrl.startJammin();
    });

    var fakeUsersObj = [
      { 'id': 1,
        'name': 'Joe B',
        'socketId': '123'
      },
      { 'id': 2,
        'name': 'Wendy',
        'socketId': 'ABC'
      }
    ];
    var fakeOtherUsersObj = [
      { 'id': 2,
        'name': 'Wendy',
        'socketId': 'ABC'
      }
    ];

    it('updates UserFactory users and ctrl.otherUsers', function() {
      ctrl.nickname = 'Joe B'
      fakeSockets.receive('update users', [fakeUsersObj]);
      expect(fakeUsers.otherUsers).toHaveBeenCalled();
      expect(ctrl.otherUsers).toEqual(fakeOtherUsersObj);
    });

    it('toggles the metronome upon entering', function() {
      expect(fakeMetronome.toggleMetronome).toHaveBeenCalledWith('off');
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
