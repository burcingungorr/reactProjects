import { configureStore } from '@reduxjs/toolkit';
import markdownReducer from './redux/markdownSlice';

const store = configureStore({
    reducer: {
        markdown: markdownReducer
    }
});

export default store;
