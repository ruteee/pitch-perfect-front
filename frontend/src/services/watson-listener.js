import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import api from '../services/api';

async function createListener() {

    const token = await api.get('/api/speech-to-text/token');
    console.log(token.data);

    var textStream = recognizeMicrophone(Object.assign(token.data, { // eslint-disable-line
        // outputElement: '#output', // CSS selector or DOM Element
        model: 'pt-BR_NarrowbandModel',
        clear: true,
        decodeStrings: true,
        format: true,
        objectMode: true,
    }));

    console.log(textStream);

    // textStream.on('data', user_speech_text => console.log('Watson hears:', user_speech_text));
    // textStream.on('error', e => console.log(`error: ${e}`));
    // textStream.on('close', e => console.log(`close: ${e}`));

    return textStream;
}

export default createListener;