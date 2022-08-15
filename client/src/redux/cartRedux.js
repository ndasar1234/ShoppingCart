import { createSlice } from "@reduxjs/toolkit"

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity++
            state.products.push(action.payload)
            state.total += action.payload.price * action.payload.quantity
        },
        addDuplicate: (state, action) => {
            state.products[0].quantity++
            state.total += state.products[0].price
        },
        removeDuplicate: (state, action) => {
            state.products[0].quantity--
            state.total -= state.products[0].price
        },
        // updateDuplicate: (state, action) => {
        //     console.log(state, action.payload)
        //     state = action.payload
        // }
    }
})

export const { addProduct, addDuplicate, removeDuplicate } = cartSlice.actions
export default cartSlice.reducer