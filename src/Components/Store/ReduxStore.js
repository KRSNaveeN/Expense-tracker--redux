
import {createSlice, configureStore} from '@reduxjs/toolkit';

const authstate = {login : false, token : null, localId:''};
const data  = {
    listitems : [],   
}

const authslice= createSlice({
    name : 'authentication',
    initialState : authstate,
    reducers : {
        login(state){
            state.login = !state.login
        },
        token(state,action)
        {
            state.token = action.payload;
        },
        localId(state,action){
            state.localId = action.payload;
        }
       
    }
});

const dataslice = createSlice({
    name :'datacollection',
    initialState : data,
    reducers : {
        entereddata(state,action){
            state.listitems = action.payload
        }
    }
})


const store = configureStore({
    reducer : {
        authdata : authslice.reducer,
        listdata : dataslice.reducer
    }
});

export const authActions = authslice.actions;
export const listActions = dataslice.actions;

export default store;