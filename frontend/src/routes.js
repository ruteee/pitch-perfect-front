import React  from 'react'
import { BrowserRouter, Route } from 'react-router-dom';
import InitPitch from './pages/InitPitch.js';
import Main from './pages/Main.js';
import Present from './pages/Present.js';

function Routes(props){
    return(
        <BrowserRouter>
            <Route path="/" exact component = {InitPitch} />
            <Route path="/main" component = {Main}/>
            <Route path="/present" exact component = { Present }/>
            <Route path="/present/:pitch_id" exact component = { Present }/>
        </BrowserRouter>
    )
}

export default Routes