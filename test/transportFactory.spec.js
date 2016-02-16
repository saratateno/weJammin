describe('factory: TransportFactory', function() {
  beforeEach(module('Jammin'));

  var transportFactory;

  beforeEach(inject(function(TransportFactory)  {
    transportFactory = TransportFactory;
  }));

  it('toggles the metronome off when it is on', function() {
    expect(transportFactory.toggleMetronome('on')).toEqual("off")
  });

  it('toggles the metronome on when it is off', function() {
    expect(transportFactory.toggleMetronome('off')).toEqual("on")
  });
 });
