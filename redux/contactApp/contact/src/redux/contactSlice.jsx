import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

export const contactAdaptor = createEntityAdapter();

const initialState = contactAdaptor.getInitialState();
export const contactSelectors=contactAdaptor.getSelectors((state)=>state.contacts);

const contactSlice = createSlice({
    name:'contact',
    initialState,
    reducers:{
        addContact:contactAdaptor.addOne,
        //tek bir varlığı kabul eder ve mevcut değilse ekler
        addContacts:contactAdaptor.addMany,
        //bir varlık dizisi veya nesne kabul eder
        deleteContact:contactAdaptor.removeOne,
        removeAllContact:contactAdaptor.removeAll,
        updateContact:contactAdaptor.updateOne,
    }
})

export const {addContact,deleteContact,removeAllContact,updateContact} = contactSlice.actions;
export default contactSlice.reducer;