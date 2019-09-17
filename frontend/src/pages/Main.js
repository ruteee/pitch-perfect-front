import React, {useCallback} from 'react'
import './Main.css'
// import $ from 'jquery'

function Main({ location: { state } }){

    const elements = []
    var flag_in = false
    
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
                        if (e.target.type !== 'undefined')
                            treat_element(e.target)                    })
                });
            });
        }

    }, [])

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
    

    function set_action( ){
        console.log(elements)
    }
    return(
        <div> 
            <h3> View da configuração</h3>
            <div className='app-settings'> 
                <button  className='set-button' onClick= {set_action}> Cadastrar nova ação </button>

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