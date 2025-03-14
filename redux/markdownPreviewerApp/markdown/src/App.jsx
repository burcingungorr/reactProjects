import React from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Preview from './components/Preview';
import './App.css';

const App = () => {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <Editor />
                <Preview />
            </div>
        </div>
    );
};

export default App;
