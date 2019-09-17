import React, { useState, useEffect } from 'react';

import api from '../services/api';
import './Present.css';

export default function Present({ match }) {
    const [ pitch, setPitch ] = useState( null );
    const { pitch_id } = match.params;
    
    useEffect( () => {
        async function getPitch() {
            const response = await api.get(`/pitch/${ pitch_id }`)
            setPitch(response.data);
        }

        getPitch();
    } , [ pitch_id ]);

    useEffect( () => {
        console.log(pitch);
        
    }, [ pitch ]);

    return (
        <div className="pitch-presentation">
            <div className='div-iframe'>                  
                 <iframe title = "Presentation" src="http://localhost:3000/">
                 </iframe>
            </div>
        </div>
    );

}