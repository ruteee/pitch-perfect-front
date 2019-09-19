import React, {useCallback, useState} from 'react'
import './Main.css'
import  api from '../services/api'


function Main({ location: { state }}){

    const [actionstate, setActionstate] = useState([]);
    const [capturing, setCapturing] = useState(false);
    // var capturing = false;

    var actions = []
    var flag_in = false
    var steps= []
    
    const node_iframe = useCallback(node =>{
        if (node !== null){
            node.addEventListener("load", function(){
                console.log("loaded")
                var iframe_el = node
                var innerDoc = iframe_el.contentWindow.document || iframe_el.contentWindow

                var events = ['click', 'change'] 
                events.map(function(val, idx){
                    return innerDoc.addEventListener(val, e => {
                        e.preventDefault();
                        console.log(e.target.type);
                        console.log(e.type)
                        if (e.target.type != null){
                            build_action(e)        
                        }
                    })
                });
            });
        }

    }, [])

    async function sendPitch(pitch_obj){
        await api.post(`/pitch/`, pitch_obj);

    }

    function build_action(e){
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
        flag_in = false
        for (const idx_ in actions) {
            if (actions[idx_]['target'] === action.target){
                actions[idx_] = action
                flag_in = true             
            }         
        }

        if (!flag_in)
            actions.push(action)

        console.log('ac',actions)
        // setActionstate(actions)
    }

    
    function mount_pitch(){       
        console.log('mounr' ,capturing)

        // if (capturing){
            var name=  document.getElementById("pitch_name").value;
            var pitch = {'name': name, 'url': state['url_content'], 'steps': steps }
            console.log("mounted",pitch)
            console.log('id', pitch)
            sendPitch( pitch)
        // }
     
    }

    function update_steps( ){
        console.log('uo',capturing, actions)
        // if (capturing){
            var trigger = document.getElementById('gatilho').value
            steps.push({trigger, 'actions': actions})
            console.log('up',actions)

        // }
    }
    

    return(
        <div> 
            <div className='app-settings'>
            <span className='lbl-init' > Init record</span>
                <div className='init'>
                    <label className="switch">
                        {/* <input id='cap'onClick ={x=> setCapturing(true)} type="checkbox"/> */}
                        <input id='cap' type="checkbox"/>
                        <span className="slider round"></span>
                    </label> 
                    <input type='text' className='gatilho' id='gatilho' placeholder='Gatilho' />
                </div>

                <div className='capt-form'>
                    <input id ="pitch_name" type='text' placeholder = "Pitch Name"/>  
                    <button  id='btn-register' className='set-button' onClick= {update_steps}> Add step </button>
                    <button  id='btn-end-register' className='end-pitch' onClick={mount_pitch}> End  </button>

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
                </div>

                

                
            </div>
            <div className='div-iframe'>                  
                 <iframe ref={node_iframe} title = "Main iframme" src={state['url_content']}>
                     <p> Page could not be loaded</p>
                 </iframe>
            </div>
        </div>
        )
    }


export default Main