import { createSlice } from "@reduxjs/toolkit";


const profileSlice = createSlice({
    name:'profile',
    initialState:{
        user: false,
        regAlert:false,
        logAlert:false,
        logOutAlert:false,
        postDelAlert: false,
        userDelAlert: false,
        postCreAlert:false
    },
    reducers:{
        setUserTrue: (state)=>{
            state.user = true ;
        },
        setUserFalse: (state)=>{
            state.user = false ;
        },

        setRegAlertTrue: (state)=>{
            state.regAlert = true ;
        },
        setRegAlertFalse: (state)=>{
            state.regAlert = false ;
        },

        setLogAlertTrue: (state)=>{
            state.logAlert = true ;
        },
        setLogAlertFalse: (state)=>{
            state.logAlert = false ;
        },

        setLogOutAlertTrue: (state)=>{
            state.logOutAlert = true ;
        },
        setLogOutAlertFalse: (state)=>{
            state.logOutAlert = false ;
        },
        
        setPostDelAlertTrue: (state)=>{
            state.postDelAlert = true ;
        },
        setPostDelAlertFalse: (state)=>{
            state.postDelAlert = false ;
        },

        setUserDelAlertTrue: (state)=>{
            state.userDelAlert = true ;
        },
        setUserDelAlertFalse: (state)=>{
            state.userDelAlert = false ;
        },
        
        setPostCreAlertTrue: (state)=>{
            state.postCreAlert = true ;
        },
        setPostCreAlertFalse: (state)=>{
            state.postCreAlert = false ;
        },
    },
});

export const {
             setUserTrue, setUserFalse, 
             setRegAlertTrue, setRegAlertFalse, 
             setLogAlertTrue, setLogAlertFalse,
             setLogOutAlertTrue,setLogOutAlertFalse,
             setPostDelAlertTrue,setPostDelAlertFalse,
             setUserDelAlertTrue,setUserDelAlertFalse,
             setPostCreAlertTrue,setPostCreAlertFalse
             } = profileSlice.actions ;
export default profileSlice.reducer ;