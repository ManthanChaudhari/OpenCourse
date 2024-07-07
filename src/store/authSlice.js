import { createSlice } from "@reduxjs/toolkit"
const initialState = {
    userData : null,
    authorized : false,
    allCourses : [],
    filterCourses : []
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
        },
        storeAllCourses : (state , action) => {
            state.allCourses = [...action.payload]
        },
        filterMyCourses : (state , action) => {
            state.filterCourses = [...action.payload];
        }
    }
});
export const {signIn , logOut,filterMyCourses} = authSlice.actions;
export default authSlice.reducer;