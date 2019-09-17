import React, {useCallback} from 'react'
import './Main.css'
import  api from '../services/api'


function Main({ location: { state } , match}){

    const elements = []
    var flag_in = false
    var capturing = false
    var pitch= []
    
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
                        if (e.target.type != null && capturing){
                            treat_element(e.target)        
                        }
                    })
                });
            });
        }

    }, [])

    async function sendPitch(id, pitch_obj){
        await api.post(`/pitch/`, null, {
            headers: { pitch: match.params.id},
            data: {
                picth: pitch_obj}
        });

    }

    function treat_element(element){
        var element_treated = {}
        element_treated.type= element.type
        element_treated.id = element.id

        switch (element.type) {
            case 'text':
                element_treated.attr= element.value
                break;
            case 'submit':
                element_treated.attr = 'click'
                break;
            default:
                break;
        }
        flag_in = false
        for (const idx_ in elements) {
            if (elements[idx_]['id'] === element_treated.id){
                elements[idx_] = element_treated
                flag_in = true             
            }         
        }

        if (!flag_in){
            elements.push(element_treated)
        }        
    }
    
    function mount_pitch_obj(){
        const uuidv4 = require('uuid/v4')
        var name_picth =  document.getElementById("pitch_name").value;
        var pitch_obj = {'id': uuidv4() , 'name': name_picth, 'actions': pitch }
        console.log("mounted",pitch_obj)
        console.log('id', pitch_obj.id)

        // sendPitch(pitch_obj.id, pitch_obj)
    }

    function set_action( ){
        console.log(elements)
        pitch.push(elements)
    }
    return(
        <div> 
            <h3> View da configuração</h3>
            <div className='app-settings'> 
                <span> Iniciar modo de captura</span>
                <label className="switch">
                    <input onClick ={e => capturing = !capturing} type="checkbox"/>
                    <span className="slider round"></span>
                </label>   
                <input id ="pitch_name" type='text' placeholder = "Digite o nome do seu pitch"/>  
                <button  id='btn-register' className='set-button' onClick= {set_action}> Cadastrar nova ação </button>
                <button  id='btn-end-register' className='set-button' onClick={mount_pitch_obj}> Finalizar </button>
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