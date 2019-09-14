import React, {useEffect} from 'react'
import './Main.css'

function Main({ location: { state } }){

    console.log(state);

    useEffect( () =>{
        console.log('mount')
        this.script = document.createElement("script");
        this.script.src = "../src/get_event.js";
        this.script.async = true;
        this.script.type="text/jsx"
        this.script.onload = () => this.onScriptLoad();
        document.body.appendChild(this.script);
    });
    return(
        <div> 
            <h3> View da configuração</h3>
            <div className='app-settings'> teste</div>
            <div className='div-iframe'>                  
                 <iframe title = "Main iframme" src="https://sigaa.ufrn.br/sigaa/public/home.jsf">
                     <p> Page could not be loaded</p>
                 </iframe>
            </div>
        </div>
        )
    }

export default Main