//KICK
		var kickEnvelope = new Tone.AmplitudeEnvelope({
		    "attack": 0.01,
		    "decay": 0.2,
		    "sustain": 0,
		    "release": 0
		}).toMaster();

		var kick = new Tone.Oscillator("A2").connect(kickEnvelope).start();

		var kickSnapEnv = new Tone.FrequencyEnvelope({
		    "attack": 0.005,
		    "decay": 0.01,
		    "sustain": 0,
		    "release": 0,
		    "baseFrequency": "A2",
		    "octaves": 2.7
		}).connect(kick.frequency);

		var kickPart = Tone.Transport.schedule(function(time){
			kickEnvelope.triggerAttack(time);
			kickSnapEnv.triggerAttack(time);
		}, "0:1");

		//TRANSPORT
		Tone.Transport.loopStart = 0;
		Tone.Transport.loopEnd = "0:2";
		Tone.Transport.loop = true;

    Tone.Transport.bpm.value = 120;
