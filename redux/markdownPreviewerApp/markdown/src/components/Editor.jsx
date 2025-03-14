import React from 'react';
import '../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateMarkdown } from '../redux/markdownSlice';


const Editor = () => {

    const dispatch = useDispatch();
    const text = useSelector(state => state.markdown.text);


    return (
        <textarea 
            className="editor"
            value={text}
            onChange={(e)=>dispatch(updateMarkdown(e.target.value))}
        />
    );
};

export default Editor;
