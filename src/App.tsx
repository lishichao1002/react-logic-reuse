import React, { useState } from 'react';
import './App.css';
// import { Panel1 } from './ButtonImpl1/Panel';
// import { Panel2 } from './ButtonImpl2/Panel';
// import { Panel3 } from './ButtonImpl3/Panel3';
// import { Panel4 } from './ButtonImpl4/Panel4';
import { useSetState } from './common/hooks';

function App2() {
    const [count, setCount] = useState(0);

    function handleClcik1() {
        setCount(count + 1);
        setCount(count + 1);
    }

    function handleClcik2() {
        setCount((c) => c + 1);
        setCount((c) => c + 1);
    }

    console.log("render", count);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>{count}</h2>
            <button onClick={handleClcik1}>add use state</button>
            <button onClick={handleClcik2}>add use callback</button>
        </div>
    );
}

function App3() {
    const [state, setState] = useSetState({
        count: 0,
        count1: 1
    });

    function handleClcik1() {
        setState({ count: state.count + 1 });
        setState({ count: state.count + 1 });
    }

    function handleClcik2() {
        setState((state) => ({ count: state.count + 1 }));
        setState((state) => ({ count: state.count + 1 }));
    }

    console.log("render", state.count);

    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>{state.count}</h2>
            <button onClick={handleClcik1}>add use state</button>
            <button onClick={handleClcik2}>add use callback</button>
        </div>
    );
}

function App() {
    return (
        <App3/>
    );
}

export default App;
