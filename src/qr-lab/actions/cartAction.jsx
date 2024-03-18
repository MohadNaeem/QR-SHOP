import { ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO } from "../contants/constants"
import axios from "axios"

// Add to Cart
export const addItemToCart = (product, quantity) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/v1/product/${id}`);
  dispatch({
    type: ADD_TO_CART,
    payload: {
      productId: product,
      quantity,
    },
  })

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems))
}

// Remove item from Cart
export const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({ type: REMOVE_CART_ITEM, payload: id })

  // Save cart data to localStorage after dispatching the action
  localStorage.setItem("cartItem", JSON.stringify(getState().cart.cartItems))
}

// Save Shipping Info
export const saveShippingInfo = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  })

  // Save shipping info data to localStorage after dispatching the action
  localStorage.setItem("shippingInfo", JSON.stringify(data))
}
