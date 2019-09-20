import React, { useState, useEffect } from 'react';

import {Button, TextField, FormGroup,AppBar,Toolbar, Drawer, Typography, IconButton, Divider, List, ListItemText, ListItem, FormControl, FormControlLabel } from '@material-ui/core/'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Flash from '@material-ui/icons/FlashOn';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import NavigationIcon from '@material-ui/icons/Navigation';
import Fab from '@material-ui/core/Fab';

import ListSubheader from '@material-ui/core/ListSubheader';



import api from '../services/api';
import './Present.css';

import createListener from '../services/watson-listener';


const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
    AppBar:{
        // height: theme.spacing(6),
        alignItems: 'center'
    },
    ListSubheader:{
        alignItems: 'center'
    },
}))

export default function Present({ match }) {

    const classes = useStyles();
    const theme = useTheme();

    const [ pitch, setPitch ] = useState( null );
    const [ textStream, setTextStream ] = useState( null );
    const { pitch_id } = match.params;
    
    var currentStep = 0;

    useEffect( () => {
        async function getPitch() {
            const response = await api.get(`/pitch/${ pitch_id }`)
            setPitch(response.data);
        }
        getPitch();
    } , [ pitch_id ]);


    function triggerAction(action) {
        let iframe_content = document.getElementById('iframe-content');
        let target_el = iframe_content.contentWindow.document.querySelector(action.target);
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

    
    async function startPresentation() {
        setTextStream(await createListener());
    }

    useEffect( () => {
        if (textStream) {
            textStream.on('data', user_speech_text => processTextFromSpeech(user_speech_text.results[0].alternatives[0].transcript));
            textStream.on('error', e => console.log(`error: ${e}`));
            textStream.on('close', e => console.log(`close: ${e}`));
        }
    }, [ textStream ])

    function processTextFromSpeech(text) {
        if (currentStep < pitch.steps.length) {
            const trigger = pitch.steps[currentStep].trigger;
            console.log("Trigger:", trigger, "; Texto:", text);
            
            if (text.includes(trigger)) {
                for (const action of pitch.steps[currentStep].actions) {
                    triggerAction(action);
                }
                currentStep = currentStep + 1;
            }
            
            if ( currentStep === pitch.steps.length ) {
                textStream.stop();
            }    
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
                    <AppBar position="static" className={classes.AppBar}>
                        <Toolbar>
                            <Typography variant="h6" className={classes.title} >
                                Pitch Flow
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Divider/> 
                    <FormGroup className='form-present'>
                        <Button variant ="outlined"  className={classes.Button} id="btn_send_url" onClick={startPresentation}> Start Presentation</Button>
                        
                        <TextField
                            disabled
                            label="Name"
                            defaultValue={pitch.name}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                            readOnly: true,
                            }}
                            variant="outlined"
                        />                        

                        <TextField
                            disabled
                            label="URL"
                            defaultValue={pitch.url}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                            readOnly: true,
                            }}
                            variant="outlined"
                        />

                    </FormGroup>       
                    <Divider/>
                    <FormGroup>                        
                        <List>
                            <ListSubheader className={classes.ListSubheader} component="div" id="nested-list-subheader">
                                <Typography variant='h6'> Triggers </Typography>
                            </ListSubheader>
                            
                            { pitch.steps.map((step, i) => (
                                <ListItem button className="step-description">
                                    <ListItemIcon> 
                                        <Flash/>
                                    </ListItemIcon>
                                    <ListItemText key={ step._id } className="step-trigger" primary={step.trigger}>
                                    </ListItemText>
                                </ListItem>
                            )) }
                        </List>                        
                    </FormGroup>
                </div>
                ) : (
                    <div className="empty-pitch">Loading...</div>
                ) } */}










            {/* { pitch ? (
                <div className="pitch-description" key={ pitch._id }>
                    <div id="output"></div>
                    <button type="button" onClick={ startPresentation }>Start present</button>

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
                ) } */}
        </div>
    );
}
