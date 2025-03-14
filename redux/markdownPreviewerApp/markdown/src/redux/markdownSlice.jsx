import { createSlice } from '@reduxjs/toolkit';

const markdownSlice = createSlice({
    name: 'markdown',
    initialState: {
        text: "# Markdown Previewer\n\nBu bir **markdown** önizleyici!"
    },
    reducers: {
        setExampleMarkdown:(state)=>{
            state.text=`# Örnek Başlık\n\n- Liste Elemanı 1\n- Liste Elemanı 2\n\n**Kalın Yazı** _İtalik Yazı_`;
        },
        updateMarkdown: (state, action) => {
            state.text = action.payload; //dışarıdan bir değer alıyoruz
        }
    }
});

export const {setExampleMarkdown,updateMarkdown} = markdownSlice.actions;
export default markdownSlice.reducer;
