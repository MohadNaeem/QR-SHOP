import { BrowserRouter, Routes, Route } from "react-router-dom"
import DesignEditor from "~/views/DesignEditor"
import Dashboard from "~/views/Dashboard"
import { MyHomeComponent } from "./qr-lab/HomePage.jsx"
import { getProduct } from "./qr-lab/actions/productAction.jsx"
import { ProductsPage } from "./qr-lab/ProductsPage.jsx"
import { ProductDetailsComponent } from "./qr-lab/ProductsDetailsPage.jsx"
import { CartComponent, AddressComponent, PaymentComponent, OrderCompleteComponent } from "./qr-lab/QRShop.jsx"
import { DashboardComponent } from "./qr-lab/DashboardPage.jsx"
import PrivacyPolicyPage from "./qr-lab/PrivacyPolicy.jsx"
import { LoginQrLab } from "./qr-lab/LoginPage.jsx"
import { AuthWrapper } from "./qr-lab/components/AuthWrapper"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { useDispatch } from "react-redux"
import { useUserAuthContext } from "./qr-lab/context/AuthContext.jsx"

const STRIPE_KEY = import.meta.env.VITE_APP_STRIPE_KEY

import ReactGA from 'react-ga';
const TRACKING_ID = "G-F4X6ZNC3YR"; // OUR_TRACKING_ID
ReactGA.initialize(TRACKING_ID);

const Router = () => {
  const [stripeApiKey, setStripeApiKey] = useState("")
  const [variantId, setVariantId] = useState("")
  const [formValue, setFormValue] = useState({})
  const { user } = useUserAuthContext()
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProduct())
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MyHomeComponent />} />
        <Route path="/designer" element={<DesignEditor setVariantId={setVariantId} />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/product/:id" element={<ProductDetailsComponent />} />
        <Route path="/policy/privacy" element={<PrivacyPolicyPage />} />
        <Route
          path="/cart"
          element={
            <AuthWrapper>
              <CartComponent setVariantId={setVariantId} />
            </AuthWrapper>
          }
        />
        <Route
          path="/shipping"
          element={
            <AuthWrapper>
              <AddressComponent setFormValue={setFormValue} variantId={variantId} />
            </AuthWrapper>
          }
        />
        <Route
          path="/process/payment"
          element={
            <AuthWrapper>
              <Elements stripe={loadStripe(STRIPE_KEY)}>
                <PaymentComponent priceData={formValue} stripeKey={stripeApiKey} />
              </Elements>
            </AuthWrapper>
          }
        />
        <Route
          path="/success"
          element={
            <AuthWrapper>
              <OrderCompleteComponent />
            </AuthWrapper>
          }
        />
        <Route path="/login" element={<LoginQrLab />} />
        <Route
          path="/dashboard"
          element={
            <AuthWrapper>
              <DashboardComponent />
            </AuthWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
