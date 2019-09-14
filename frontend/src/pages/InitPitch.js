import React, {useState} from 'react'
import './InitPitch.css'

function InitPitch({ history }){

const [webpage, setWebPage] = useState('');

    function handleSubmit(e){
        e.preventDefault()
        console.log(webpage)
        history.push('/main')
    }
    return (
        <div className="init-settings">
            <form onSubmit={ handleSubmit}>
                <input type='text' 
                    placeholder ='Escreva a url da sua aplicação' 
                    value = { webpage }  
                    onChange={ e => setWebPage(e.target.value)} />
                <button type='submit'> Configurar Aplicação</button>
            </form>
            
        </div>
    );
}

export default InitPitch;