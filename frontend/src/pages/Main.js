import React from 'react'
import './Main.css'

class Main extends React.Component{

   componentDidMount() {
        console.log('mount')
        this.script = document.createElement("script");
        this.script.src = "../src/get_event.js";
        this.script.async = true;
        this.script.type="text/jsx"
        this.script.onload = () => this.onScriptLoad();
        document.body.appendChild(this.script);
}

    render(){
        return(

            <div>
                <h3> View da configuração</h3>
                <div className='app-settings'> teste</div>
                <div className='div-iframe'>                  
                     <iframe title = "Main iframme" src="http://localhost:8080/t2.html" id='iframe-id'>
                         <p> Page could not be loaded</p>
                     </iframe>
                </div>
                
            </div>
        )};
}

export default Main