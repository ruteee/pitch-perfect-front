import React  from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import InitPitch from './pages/InitPitch.js';
import Main from './pages/Main.js';
import Present from './pages/Present.js';
import Watson from './pages/Watson.js';

import TelaTeste from './pages/TelaTeste';

function Routes(props){
    return(
        <BrowserRouter>
            <Route path="/" exact component = {InitPitch} />
            <Route path="/main" component = {Main}/>
            <Route path="/present" exact component = { Present }/>
            <Route path="/present/:pitch_id" exact component = { Present }/>
            <Route path="/watson" exact component = { Watson } />
            <Route path="/form" exact component={ TelaTeste }/>
        </BrowserRouter>
    )
}

export default Routes