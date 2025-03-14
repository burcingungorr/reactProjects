import React from 'react';
import '../index.css';
import { useDispatch } from 'react-redux';
import { setExampleMarkdown } from '../redux/markdownSlice';

const Header = () => {
    const dispatch = useDispatch();

    return (
        <div className="header">
            <h1>Markdown Previewer</h1>
            <button 
                className="help-button"
                onClick={() => dispatch(setExampleMarkdown())}
            >
                ?
            </button>
        </div>
    );
};

export default Header;
