import {createSlice} from '@reduxjs/toolkit';

export const counterSlice = createSlice({
    name:'counter',
    initialState:{//initial degeri
        value:0
    },

    reducers:{//stati güncelleyecekler
        increment:(state)=>{
            state.value+=1
        },
        descrement:(state)=>{
            state.value-=1
        },
        incrementByAmount:(state,action)=>{//componentimden fonk.a gönderilen
            state.value+=Number(action.payload)
        }
    }


});

export const {increment,descrement,incrementByAmount} =counterSlice.actions;
export default counterSlice.reducer; 