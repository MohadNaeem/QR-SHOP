import { combineReducers } from "@reduxjs/toolkit"
import { designEditorReducer } from "./slices/design-editor/reducer"
import { fontsReducer } from "./slices/fonts/reducer"
import { uploadsReducer } from "./slices/uploads/reducer"
import { resourcesReducer } from "./slices/resources/reducer"
import { productsReducer } from "../qr-lab/reducers/productReducer.jsx"
import { cartReducer } from "../qr-lab/reducers/cartReducer.jsx"

const rootReducer = combineReducers({
  designEditor: designEditorReducer,
  fonts: fontsReducer,
  uploads: uploadsReducer,
  resources: resourcesReducer,
  products: productsReducer,
  cart: cartReducer,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
