import React from 'react'
import './Main.css'

export default function Main({ location: { state } }){
    console.log(state);

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