import React, { useState, useEffect } from 'react'
import './InitPitch.css'
import api from '../services/api';

function InitPitch({ history }){

    const [webpage, setWebPage] = useState('');
    const [ pitches, setPitchList ] = useState( [] );

    useEffect(() => {
        async function loadPitches() {
            const response = await api.get('/pitches');
            setPitchList(response.data);
        }

        loadPitches();
    }, []);

    function handleSubmit(e){
        e.preventDefault()
        console.log(webpage)
        history.push(`main`, { url_content: webpage });
    }
    return (
        <div>
            <div className="init-settings">
                <form onSubmit={ handleSubmit}>
                    <input id= "text_url" type='text' 
                        placeholder ='Escreva a url da sua aplicação' 
                        value = { webpage }  
                        onChange={ e => setWebPage(e.target.value)} />
                    <button id="btn_send_url" type='submit'> Configurar Aplicação</button>
                </form>
            </div>

            { pitches.length > 0 ? (
                <div className="pitch-list">
                    <ul>
                        { pitches.map((pitch) => (
                            <li key={ pitch._id }>
                                <p>{ pitch.name }</p>
                                <p>{ pitch.url }</p>
                            </li>
                        )) }
                    </ul>
                </div>
            ) : (
                <div className="empty">Acabou :(</div>
            ) }
        </div>
    );
}

export default InitPitch;