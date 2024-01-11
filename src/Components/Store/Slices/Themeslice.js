import {createSlice } from "@reduxjs/toolkit";

const themestate = {
    theme : false,
    togglebtn : false
}

const themeslice = createSlice({
    name : "darktheme",
    initialState : themestate,
    reducers :{
        toggle(state){
            state.theme = !state.theme
        },
        premium(state)
        {
          
                state.togglebtn = true;
                state.theme = true
        },
        premiumoff(state){
            state.theme = false;
            state.togglebtn = false;
        }
    }
});

export const themeActions = themeslice.actions;

export default themeslice;