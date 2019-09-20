import React, {useEffect, useState} from 'react'
import './Main.css'
import  api from '../services/api'


function Main({ location: { state }}){

    const [actionstate, setActionstate] = useState([]);
    const [capturing, setCapturing] = useState(false);
    // const [flagIn, setFlagIn] = useState(false);



    var actions = []
    var flagIn = false
    var steps= []

    const node_iframe = useEffect(()=>{
        var iframe_el = document.getElementById("iframe-id")
        var innerDoc = iframe_el.contentWindow.document || iframe_el.contentWindow

        var events = ['click', 'change']
        
        if (capturing){
            events.map(function(val, idx){
                return innerDoc.addEventListener(val, e => {
                    e.preventDefault();
                    console.log(e.target.type);
                    if (e.target.type != null){
                        build_action(e)        
                    }
                })
            });
        }
    }, [capturing])

      
    function build_action(e) {
        var action = {}
        action.event = e.type
        action.target = e.target.id

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
    }
    

    return(
        <div> 
            <div className='app-settings'>
            <span className='lbl-init' > Init record</span>
                <div className='init'>
                    <label className="switch">
                        <input id='cap' type="checkbox" onClick= { e=> setCapturing(!capturing) }/>
                        <span className="slider round"></span>
                    </label> 
                    <input type='text' className='gatilho' id='gatilho' placeholder='Gatilho' />
                </div>

                <div className='capt-form'>
                    <input id ="pitch_name" type='text' placeholder = "Pitch Name" />  
                    <button  id='btn-register' className='set-button' onClick= {update_steps} > Add step </button>
                    <button  id='btn-end-register' className='end-pitch' onClick={mount_pitch} > End  </button>

                    {actionstate.length > 0 ? (
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
                )}
                </div>
  
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