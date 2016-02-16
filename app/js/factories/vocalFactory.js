jammin.factory('VocalFactory', [function() {
  var vocalFactory = {};

  var cantouch = new Howl ({
    urls: ['wav/cantouch.wav']
  })

  var pushat = new Howl ({
    urls: ['wav/pushat_unh.mp3']
  })


  vocalFactory.playVocal = function(vocalName) {
    if (vocalName === 'cantouch') { cantouch.play(); }
    else if (vocalName === 'pushat') { pushat.play(); }
  }

  return vocalFactory;

  }]);
