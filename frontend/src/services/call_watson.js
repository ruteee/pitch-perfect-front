 function speech_text() {
    const mic = require('mic');
    const SpeechToTextV1 = require('ibm-watson/speech-to-text/v1');
    const speechToText = new SpeechToTextV1({
    iam_apikey: 'Eqky6yJU8L-NTw0XKAmqwVpl3-wgtzRmk0q8jZ6cREgt',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    model: 'pt-BR_NarrowbandModel',
    });

    // 1. Microphone settings
    // const micInstance = mic({
    // rate: 44100,
    // channels: 2,
    // debug: false,
    // exitOnSilence: 6
    // });

    navigator.getUserMedia = ( navigator.getUserMedia    || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||navigator.msGetUserMedia);


    // 2. Service recognize settings
    const recognizeStream = speechToText.recognizeUsingWebSocket({
    content_type: 'audio/l16; rate=44100; channels=2',
    model: 'pt-BR_BroadbandModel',
    interim_results: true,
    })

    // 3. Start recording
    // const micInputStream = micInstance.getAudioStream();
    // micInstance.start();
    var aCtx;
    var analyser;
    var microphone;
    if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, function(stream) {
    aCtx = new webkitAudioContext();
    analyser = aCtx.createAnalyser();
    microphone = aCtx.createMediaStreamSource(stream);
    microphone.connect(analyser);
    analyser.connect(aCtx.destination);
    }, function (){console.warn("Error getting audio stream from getUserMedia")});
    };

    // console.log('Watson is listening, you may speak now.');

    // 4. Pipe audio to service
    const textStream = microphone.pipe(recognizeStream).setEncoding('utf8');

    // textStream.on('data', user_speech_text => console.log('Watson hears:', user_speech_text));
    // textStream.on('error', e => console.log(`error: ${e}`));
    // textStream.on('close', e => console.log(`close: ${e}`));
        
    return textStream.on('data', user_speech_text => console.log('Watson hears:', user_speech_text));
  }


