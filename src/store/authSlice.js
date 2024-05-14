import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userData : null,
    authorized : false,
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        signIn : (state , action) => {
            state.userData = action.payload;
            state.authorized = true;
        },
        logOut : (state) => {
            state.authorized = false;
            state.userData = null;
        }
    }
});
export const {signIn , logOut} = authSlice.actions;
export default authSlice.reducer;