import React  from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import InitPitch from './pages/InitPitch.js'
import Main from './pages/Main.js'

function Routes(props){
    return(
        <BrowserRouter>
            <Route path="/" exact component = {InitPitch} />
            <Route path="/main" component = {Main}/>
        </BrowserRouter>
    )
}

export default Routes