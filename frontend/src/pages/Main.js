import React, {useEffect, useState} from 'react'
import './Main.css'
import  api from '../services/api'

import 'typeface-roboto';
import {Button, TextField, FormGroup, FormControlLabel, FormControl, Switch, AppBar, Toolbar, Typography} from '@material-ui/core/';
import { makeStyles } from '@material-ui/core/styles';
import jQuery from  'jquery'


function Main({ location: { state }}){


    const useStyles = makeStyles(theme => ({
        button: {
          margin: theme.spacing(1),
        },
        input: {
          display: 'none',
        },

        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
          },
        FormControlLabel :{
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            marginTop: theme.spacing(2)
        },
        Switch:{
         
        },
        AppBar:{
            // height: theme.spacing(6),
            alignItems: 'center'
        },

        title: {
            flexGrow: 1,
            // marginBottom: theme.spacing(3),
          },
      }));

      const classes = useStyles();

    // const [actionstate, setActionstate] = useState([]);
    const [capturing, setCapturing] = useState(false);
    // const [flagIn, setFlagIn] = useState(false);


    var actions = []
    var flagIn = false
    var steps= []

    const node_iframe = useEffect(()=>{
        var iframe_el = document.getElementById("iframe-id")
        var innerDoc = iframe_el.contentWindow.document || iframe_el.contentWindow

        var events = ['click', 'change']

        jQuery.fn.extend({
            getPath: function() {
                var pathes = [];
        
                this.each(function(index, element) {
                    var path, $node = jQuery(element);
        
                    while ($node.length) {
                        var realNode = $node.get(0), name = realNode.localName;
                        if (!name) { break; }
        
                        name = name.toLowerCase();
                        var parent = $node.parent();
                        var sameTagSiblings = parent.children(name);
        
                        if (sameTagSiblings.length > 1)
                        {
                            var allSiblings = parent.children();
                            var index = allSiblings.index(realNode) + 1;
                            if (index > 0) {
                                name += ':nth-child(' + index + ')';
                            }
                        }
        
                        path = name + (path ? ' > ' + path : '');
                        $node = parent;
                    }
        
                    pathes.push(path);
                });
        
                return pathes.join(',');
            }
        })
        
        if (capturing){
            events.map(function(val, idx){
                return innerDoc.addEventListener(val, e => {
                    e.preventDefault();
                    console.log(e)
                    console.log(jQuery(e.target).getPath());
                    var not_interacts_el = ['DIV', 'P', 'BODY', 'B']
                    if (!not_interacts_el.includes(e.target.tagName)){
                        console.log('aqui, ', e.target.tagName)
                        build_action(e)        
                    }
                })
            });
        }
        console.log(capturing)
    }, [capturing])

    function build_action(e) {
        var target_element = jQuery(e.target).getPath()
        var action = {}
        action.event = e.type
        action.target = target_element

        switch (e.target.type) {
            case 'text':
                action.value= e.target.value
                break;
            default:
                break;
        }
        flagIn = false
        for (const idx_ in actions) {
            if (actions[idx_]['target'] === action.target){
                actions[idx_] = action
                flagIn = true         
            }         
        }

        if (!flagIn){
            actions.push(action)
        }       
        // var copy_actions = JSON.parse(JSON.stringify(actions))
        //  setActionstate(copy_actions)
    }


    async function sendPitch(pitch_obj){
        await api.post(`/pitch/`, pitch_obj);
    }
    
    function mount_pitch(){       
        if (capturing){
            var name=  document.getElementById("pitch_name").value;
            var pitch = {'name': name, 'url': state['url_content'], 'steps': steps }
            console.log("mounted",pitch)
            sendPitch( pitch)
            steps = []
        }
     
    }
    function update_steps( ){
        var copy_actions = JSON.parse(JSON.stringify(actions))
        if (capturing){
            var trigger = document.getElementById('gatilho').value
            steps.push({trigger, 'actions': copy_actions})
        }
        actions = []
        document.getElementById('gatilho').value=""
    }
    

    return(
        <div> 
            <div className='app-settings'>
                <AppBar position="static" className={classes.AppBar}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title} >
                        Settings
                        </Typography>
                    </Toolbar>
                </AppBar>
                {/* <div className='init'> */}
                    {/* <label className="switch">
                        <input id='cap' type="checkbox" onClick= { e=> setCapturing(!capturing) }/>
                        <span className="slider round"></span>
                    </label>  */}
                {/* </div> */}

                <FormControl component="fieldset">
                    <FormGroup className='capt-form '>
                    <TextField id ="pitch_name" type='text' label= "Pitch Name" variant='outlined'  margin="normal"  className={classes.textField}/> 
                        <FormControlLabel className={classes.FormControlLabel}
                                control={
                                <Switch className={classes.Switch}
                                    size="medium"
                                    checked={capturing}
                                    onChange={e=> setCapturing(!capturing) }
                                    color="primary"/>
                                }
                                label="Iniciar captura de ações"
                        />
 
                        <TextField type='text' id='gatilho' label='Gatilho'  variant='outlined'  margin="normal"  className={classes.textField} />       
                        <Button variant ="contained" id='btn-register' className={classes.button} onClick= {update_steps} > Add new action</Button>
                        <Button variant="contained"  id='btn-end-register' className={classes.button} onClick={mount_pitch} > End  </Button>

                    {/* {actionstate.length > 0 ? (
                    <div>
                        <ul>
                            {actionstate.map((item, i) => (
                                <li key={i} >
                                    <p> Action # {i}</p>
                                    <br/>
                                    <p>target: {item.target}</p>
                                    <p>event: {item.event}</p>
                                    <p>value: {item.value}</p>
                                    <br/>
                                </li>
                            ))}
                            
                        </ul>
                    </div>

                ):(
                    <div>
                        <h3> Sem steps  cadastrados </h3>
                    </div>
                )} */}
                    </FormGroup>
                </FormControl>
  
            </div>
            <div className='div-iframe'>                  
                 <iframe ref={node_iframe} id = 'iframe-id' title = "Main iframme" src={state['url_content']}>
                     <p> Page could not be loaded</p>
                 </iframe>
            </div>
        </div>
        )
    }


export default Main