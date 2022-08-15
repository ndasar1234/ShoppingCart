import { publicRequest, userRequest } from "../api/requestMethods"
import { addCustomerFailure, addCustomerStart, addCustomerSuccess, deleteCustomerFailure, deleteCustomerStart, deleteCustomerSuccess, getCustomerFailure, getCustomerStart, getCustomerSuccess, updateCustomerFailure, updateCustomerStart, updateCustomerSuccess } from "./customerRedux"
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux"
import { loginFailure, loginStart, loginSuccess, logoutStart } from "./userRedux"

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

export const getProducts = async (dispatch) => {
    dispatch(getProductStart())
    try {
        const res = await publicRequest.get("/products")
        dispatch(getProductSuccess(res.data))
    } catch (error) {
        dispatch(getProductFailure())
    }
}

export const deleteProduct = async (id, dispatch) => {
    dispatch(deleteProductStart())
    try {
        await userRequest.delete(`/products/${id}`)
        dispatch(deleteProductSuccess(id))
    } catch (error) {
        dispatch(deleteProductFailure())
    }
}

export const updateProduct = async (id, product, dispatch) => {
    dispatch(updateProductStart())
    try {
        await userRequest.put(`/products/${id}`, product)
        dispatch(updateProductSuccess({ id, product }))
    } catch (err) {
        dispatch(updateProductFailure())
    }
}

export const addProduct = async (product, dispatch) => {
    dispatch(addProductStart())
    try {
        const res = await userRequest.post(`/products`, product)
        dispatch(addProductSuccess(res.data))
    } catch (err) {
        dispatch(addProductFailure())
    }
}

export const getCustomers = async (dispatch) => {
    dispatch(getCustomerStart())
    try {
        const res = await userRequest.get("/users")
        dispatch(getCustomerSuccess(res.data))
    } catch (error) {
        dispatch(getCustomerFailure())
    }
}

export const deleteCustomer = async (id, dispatch) => {
    dispatch(deleteCustomerStart())
    try {
        await userRequest.delete(`/users/${id}`)
        dispatch(deleteCustomerSuccess(id))
    } catch (error) {
        dispatch(deleteCustomerFailure())
    }
}

export const updateCustomer = async (id, customer, dispatch) => {
    dispatch(updateCustomerStart())
    try {
        await userRequest.put(`/users/${id}`, customer)
        dispatch(updateCustomerSuccess({ id, customer }))
    } catch (err) {
        dispatch(updateCustomerFailure())
    }
}

export const addCustomer = async (customer, dispatch) => {
    dispatch(addCustomerStart())
    try {
        const res = await publicRequest.post(`/auth/register`, customer)
        dispatch(addCustomerSuccess(res.data))
    } catch (err) {
        dispatch(addCustomerFailure())
    }
    login(dispatch, { username: customer.username, password: customer.password })
}