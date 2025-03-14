import React from 'react';
import ReactMarkdown from 'react-markdown';
import '../index.css';
import { useSelector } from 'react-redux';

const Preview = () => {

    const text=useSelector(state=>state.markdown.text);

    return (
        <div className="preview">
            <ReactMarkdown>{text}</ReactMarkdown>
        </div>
    );
};

export default Preview;
