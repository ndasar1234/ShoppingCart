import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.isFetching = false
            state.currentUser = action.payload
        },
        loginFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        logoutStart: (state) => {
            state.currentUser = null
        },
        // registerStart: (state) => {
        //     state.isFetching = true
        // }
        // registerSuccess: (state) => {
        //     state.isFetching = false
        //     state.currentUser = action.payload
        // }
        // registerFailure: (state) => {
        //     state.isFetching = true
        // }
    }
})

export const { loginStart, loginSuccess, loginFailure, logoutStart } = userSlice.actions
export default userSlice.reducer