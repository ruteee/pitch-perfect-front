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

    function triggerAction(action) {
        let iframe_content = document.getElementById('iframe-content');
        let target_el = iframe_content.contentWindow.document.getElementById(action.target);
        switch (action.event) {
            case 'click':
                target_el.click();
                break;
            case 'change':
                var nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
                nativeInputValueSetter.call(target_el, action.value);
                var inputEvent = new Event('input', { bubbles: true});
                target_el.dispatchEvent(inputEvent);
                break;
            default:
                break;
        }
    }

    return (
        <div className="pitch-presentation">
            <div className='div-iframe'>                  
                 <iframe id="iframe-content" title = "Presentation" src="http://localhost:3000/">
                 </iframe>
            </div>
            { pitch ? (
                <div className="pitch-description" key={ pitch._id }>
                    <p>{ pitch.name }</p>
                    <p>{ pitch.url }</p>

                    <ul>
                        { pitch.steps.map((step) => (
                            <li key={ step._id } className="step-description">
                                <p className="step-trigger">{ step.trigger }</p>
                                <ul>
                                    { step.actions.map( (action) => (
                                        <li key={ action._id } className="action-description" onClick={ () => triggerAction(action) } >
                                            <p>{ action.event }</p>
                                            <p>{ action.target }</p>
                                            <p>{ action.value }</p>
                                        </li>
                                    )) }
                                </ul>
                            </li>
                        )) }
                    </ul>
                </div>
                ) : (
                    <div className="empty-pitch">Loading...</div>
                ) }
        </div>
    );
}
