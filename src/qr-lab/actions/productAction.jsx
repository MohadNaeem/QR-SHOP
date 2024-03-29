import axios from "axios"
import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  ADMIN_PRODUCT_FAIL,
  ADMIN_PRODUCT_REQUEST,
  ADMIN_PRODUCT_SUCCESS,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  CLEAR_ERRORS,
  ALL_REVIEW_FAIL,
} from "../contants/constants"
import { collection, query, orderBy, onSnapshot, where, getDocs } from "firebase/firestore"
import { fireStoreDb } from "../firebase/firebase"

// get ALL Products
export const getProduct = (keyword = "", currentPage = 1, price = [0, 100000], category, ratings = 0) => {
  return async (dispatch) => {
    try {
      // initial state :
      dispatch({
        type: ALL_PRODUCT_REQUEST,
      })
      const collectionRef = collection(fireStoreDb, "activeProducts")
      const productsData = []
      const snapShot = await getDocs(collectionRef)
      snapShot.docs.map((doc) => {
        if (doc.data().active) {
          productsData.push({
            refId: doc.id,
            ...doc.data(),
          })
        }
      })
      const data = {
        634: [], // ornaments
        181: [], // iphones
        3: [], // canvas
        694: [], // calendar
        172: [], // frame
        505: [], // stickers
        611: [], // coaters
        568: [], // greeting card
        others: [],
      }
      productsData.map((product) => {
        console.log(Object.keys(data))
        if (Object.keys(data).includes(product.product_id?.toString())) {
          data[product.product_id].push(product)
        } else {
          data["others"].push(product)
        }
      })
      dispatch({
        type: ALL_PRODUCT_SUCCESS,
        payload: [
          ...data[505],
          ...data[611],
          ...data[568],
          ...data[3],
          ...data[181],
          ...data[694],
          ...data[172],
          ...data[634],
          ...data["others"],
        ],
      })
      setTimeout(() => {}, 1000)
    } catch (error) {
      dispatch({
        type: ALL_PRODUCT_FAIL,
        payload: error.message,
      })
    }
  }
}

// Get Products Details
export const getProductDetails = (id) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: PRODUCT_DETAILS_REQUEST,
      })

      // const { data } = await axios.get(`/api/v1/product/${id}`);

      dispatch({
        type: PRODUCT_DETAILS_SUCCESS,
        payload: id,
      })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload: error.message,
      })
    }
  }
}

//Add new Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_REVIEW_REQUEST })

    const config = { headers: { "Content-Type": "application/json" } }

    const { data } = await axios.put(`/api/v1/review/new`, reviewData, config)

    dispatch({ type: NEW_REVIEW_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: NEW_REVIEW_FAIL, payload: error.message })
  }
}

// admin product request :
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_PRODUCT_REQUEST })

    const { data } = await axios.get("/api/v1/admin/products")

    dispatch({ type: ADMIN_PRODUCT_SUCCESS, payload: data.products })
  } catch (error) {
    dispatch({ type: ADMIN_PRODUCT_FAIL, payload: error.message })
  }
}

// Create Product
export function createProduct(productData) {
  return async function (dispatch) {
    try {
      dispatch({
        type: NEW_PRODUCT_REQUEST,
      })

      const config = {
        headers: { "Content-Type": "multipart/form-data" },
      }

      const { data } = await axios.post(`/api/v1/admin/product/new`, productData, config)

      dispatch({
        type: NEW_PRODUCT_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: NEW_PRODUCT_FAIL,
        payload: error.message,
      })
    }
  }
}

// Delete Product request

export function deleteProduct(id) {
  return async function (dispatch) {
    try {
      dispatch({ type: DELETE_PRODUCT_REQUEST })

      const { data } = await axios.delete(`/api/v1/admin/product/${id}`)

      dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: data.success })
    } catch (error) {
      dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message })
    }
  }
}

// updateProduct;
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST })

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    }

    const { data } = await axios.put(`/api/v1/admin/product/${id}`, productData, config)

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.success,
    })
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.message,
    })
  }
}

// get all review of product admin ==>
export const getAllreviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: ALL_REVIEW_REQUEST })

    const { data } = await axios.get(`/api/v1/reviews?id=${productId}`)
    dispatch({ type: ALL_REVIEW_SUCCESS, payload: data.reviews })
  } catch (error) {
    dispatch({ type: ALL_REVIEW_FAIL, payload: error.message })
  }
}

// delete product review
export const deleteProductReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_REVIEW_REQUEST })

    const { data } = await axios.delete(`/api/v1/product/reviews/delete?id=${reviewId}&productId=${productId}`)

    dispatch({ type: DELETE_REVIEW_SUCCESS, payload: data.success })
  } catch (error) {
    dispatch({ type: DELETE_REVIEW_FAIL, payload: error.message })
  }
}

// clear error
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS })
}
