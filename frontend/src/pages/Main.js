import React, {useCallback} from 'react'
import './Main.css'
// import $ from 'jquery'

function Main({ location: { state } }){

    console.log(state);
    const node_iframe = useCallback(node =>{
        if (node !== null){
            node.addEventListener("load", function(){
                console.log("loaded")
                var iframe_el = node
                var innerDoc = iframe_el.contentWindow.document || iframe_el.contentWindow

                var events = ['click', 'mouseover'] 
                events.map(function(val, idx){
                    return innerDoc.addEventListener(val, e => { console.log(e.target.type)})
                });
            });
        }

    }, [])
    return(
        <div> 
            <h3> View da configuração</h3>
            <div className='app-settings'> teste</div>
            <div className='div-iframe'>                  
                 <iframe ref={node_iframe} title = "Main iframme" src="http://localhost:3001/">
                     <p> Page could not be loaded</p>
                 </iframe>
            </div>
        </div>
        )
    }

export default Main