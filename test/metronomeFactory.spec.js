describe('factory: MetronomeFactory', function() {
  beforeEach(module('Jammin'));

  var metronomeFactory;

  beforeEach(inject(function(MetronomeFactory)  {
    metronomeFactory = MetronomeFactory;
  }));

  it('toggles the metronome off when it is on', function() {
    expect(metronomeFactory.toggleMetronome('on')).toEqual("off")
  });

  it('toggles the metronome on when it is off', function() {
    expect(metronomeFactory.toggleMetronome('off')).toEqual("on")
  });
 });
