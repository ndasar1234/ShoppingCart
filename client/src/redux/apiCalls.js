import { logoutStart, registerFailure, registerStart, registerSuccess } from "./userRedux"
import { publicRequest } from "../api/requestMethods"
import { loginFailure, loginStart, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginStart())
    try {
        const res = await publicRequest.post("/auth/login", user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const logout = async (dispatch) => {
    dispatch(logoutStart())
}

export const register = async (dispatch, user) => {
    dispatch(registerStart())
    try {
        const res = await publicRequest.post(`/auth/register`, user)
        dispatch(registerSuccess(res.data))
    } catch (err) {
        dispatch(registerFailure())
    }
    login(dispatch, { username: user.username, password: user.password })
}