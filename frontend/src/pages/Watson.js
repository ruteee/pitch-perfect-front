import React, { useState, useEffect } from 'react';

import api from '../services/api';
import './Watson.css';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';

// "watson-speech/speech-to-text/recognize-microphone")
export default function Watson({ match }) {

    return (
        <div className="watson">
            <p id="output">Olá</p>
            <button type="button" onClick={() => speech_text()}>CLick</button>
        </div>
    );

}

async function speech_text() {

    const token = await api.get('/api/speech-to-text/token');
    console.log(token.data);

    var textStream = recognizeMicrophone(Object.assign(token.data, { // eslint-disable-line
        outputElement: '#output' // CSS selector or DOM Element
    }));

    console.log(textStream);

    textStream.on('data', user_speech_text => console.log('Watson hears:', user_speech_text));
    textStream.on('error', e => console.log(`error: ${e}`));
    textStream.on('close', e => console.log(`close: ${e}`));
}
