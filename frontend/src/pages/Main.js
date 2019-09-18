import React, {useCallback} from 'react'
import './Main.css'
import  api from '../services/api'


function Main({ location: { state }}){

    const step = []
    var flag_in = false
    var capturing = false
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
                        if (e.target.type != null && capturing){
                            build_action(e)        
                        }
                    })
                });
            });
        }

    }, [])

    async function sendPitch(pitch_obj){
        await api.post(`/pitch/`, null, {
                name: pitch_obj.name,
                steps: pitch_obj               
        });

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
        for (const idx_ in step) {
            if (step[idx_]['target'] === action.target){
                step[idx_] = action
                flag_in = true             
            }         
        }

        if (!flag_in)
            step.push(action)
    }
    
    function mount_pitch(){
        var name=  document.getElementById("pitch_name").value;
        var pitch = {'name': name, 'url': state['url_content'], 'actions': steps }
        console.log("mounted",pitch)
        console.log('id', pitch)
        sendPitch( pitch)
    }

    function set_action( ){
        console.log(step)
        steps.push(step)
    }
    return(
        <div> 
            <div className='app-settings'>

                <div className='init'>
                    <label className="switch">
                        <input onClick ={e => capturing = !capturing} type="checkbox"/>
                        <span className="slider round"></span>
                    </label> 
                    <span className='lbl-init' > Init record</span>
                </div>

                <div className='capt-form'>
                    <input id ="pitch_name" type='text' placeholder = "Pitch Name"/>  
                    <button  id='btn-register' className='set-button' onClick= {set_action}> Add step </button>
                    <button  id='btn-end-register' className='end-pitch' onClick={mount_pitch}> End  </button>
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