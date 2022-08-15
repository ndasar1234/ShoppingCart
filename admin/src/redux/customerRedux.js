import { createSlice } from "@reduxjs/toolkit"

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        //Get All Customers
        getCustomerStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getCustomerSuccess: (state, action) => {
            state.isFetching = false
            state.customers = action.payload
        },
        getCustomerFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        //Delete a Customer
        deleteCustomerStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteCustomerSuccess: (state, action) => {
            state.isFetching = false
            state.customers.splice(
                state.customers.findIndex((item) => item._id === action.payload),
                1
            )
        },
        deleteCustomerFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Update a Customer
        updateCustomerStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateCustomerSuccess: (state, action) => {
            state.isFetching = false
            state.customers[
                state.customers.findIndex((item) => item._id === action.payload.id)
            ] = action.payload.customer
        },
        updateCustomerFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Create a Customer/User. Note: Creating a user on admin
        // makes them an admin, creating on client makes them a normal user
        addCustomerStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addCustomerSuccess: (state, action) => {
            state.isFetching = false
            state.customers.push(action.payload)
        },
        addCustomerFailure: (state) => {
            state.isFetching = false
            state.error = true
        },

    },
})

export const {
    getCustomerStart,
    getCustomerSuccess,
    getCustomerFailure,
    deleteCustomerStart,
    deleteCustomerSuccess,
    deleteCustomerFailure,
    updateCustomerStart,
    updateCustomerSuccess,
    updateCustomerFailure,
    addCustomerStart,
    addCustomerSuccess,
    addCustomerFailure
} = customerSlice.actions

export default customerSlice.reducer