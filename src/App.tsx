import React from 'react';
import './App.css';
import { Panel1 } from './ButtonImpl1/Panel';
import { Panel2 } from './ButtonImpl2/Panel';
import { Panel3 } from './ButtonImpl3/Panel3';
import { Panel4 } from './ButtonImpl4/Panel4';

function App() {
    return (
        <div className="App">
            <h1>React逻辑复用的几种实现方式</h1>
            <div className="row">
                <Panel1/>
            </div>
            <div className="row">
                <Panel2/>
            </div>
            <div className="row">
                <Panel3/>
            </div>
            <div className="row">
                <Panel4/>
            </div>
        </div>
    );
}

export default App;
