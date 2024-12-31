import { createSlice } from "@reduxjs/toolkit";

const user = {
    name: '',
    id: ''
}

const authSlice = createSlice({
    initialState: user,
    name: 'auth',
    reducers: {
        setLoggedUser: (state) => {
            console.log(state, 'signin');
            
        },
        removeLoggedUser: (state) => {
            console.log(state, 'signOut');
        }
    },
});

export const { setLoggedUser, removeLoggedUser } = authSlice.actions;
export default authSlice.reducer;