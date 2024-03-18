import * as React from "react"
import { MenuBarComponent } from "./components/MenuBarComponent"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import CartItem from "./components/CartItem"
import { FixedLoader } from "./components/loader"
import { useState } from "react"
import Select from "react-select-virtualized"
import emailjs from "emailjs-com"
import { Elements } from "@stripe/react-stripe-js"
import { dispalyMoney, generateDiscountedPrice } from "./components/DisplayMoney"
import { removeItemFromCart, saveShippingInfo } from "./actions/cartAction"
import { RemoveShoppingCartSharp } from "@material-ui/icons"
import { Button, Link, MenuItem, Select as MUISelect, Typography, useMediaQuery } from "@mui/material"
import { useEffect } from "react"
import { useElements, useStripe } from "@stripe/react-stripe-js"
import PhoneInput from "react-phone-number-input"
import "react-phone-number-input/style.css"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./components/PaymentForm"
import { doc, setDoc, getFirestore, collection, addDoc } from "firebase/firestore"
import "./styles/cart.css"
import { useUserAuthContext } from "./context/AuthContext"
const STRIPE_KEY = import.meta.env.VITE_APP_STRIPE_KEY

export const API_URL = "https://qrlab-shop-0e4dcc9b118a.herokuapp.com"

export function CartComponent({ setVariantId }) {
  const history = useNavigate()
  const alert = useAlert()
  const dispatch = useDispatch()
  const [url, setUrl] = React.useState("")
  const { cartItems } = useSelector((state) => state.cart)
  const [isLoading, setIsLoading] = useState(false)
  const smUp = useMediaQuery("(max-width:600px)")
  let totalPrice = cartItems.reduce((acc, item) => acc + item?.price * 1, 0)
  let discountedPrice = totalPrice
  let totalDiscount = totalPrice + 2 - discountedPrice
  let final = discountedPrice
  final = dispalyMoney(final)
  totalDiscount = dispalyMoney(totalDiscount)
  // totalPrice = dispalyMoney(totalPrice);

  const createProduct = async (cartItem) => {
    if (url === "") {
      alert.error("Upload your QRCode to be printed")
      return
    }
    setIsLoading(true)
    await fetch(`${API_URL}/create-product?imageUrl=${url}&id=${cartItem?.id}&name=${cartItem?.name}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        setVariantId({ ...data?.result?.sync_variants[0], ...data })
        history("/shipping")
      })
      .catch(() => {
        setIsLoading(false)
        alert.error("Unexpected error occured")
      })
  }

  const checkoutHandler = () => {
    createProduct(cartItems[0])
  }

  // new code end

  const deleteCartItems = (id) => {
    dispatch(removeItemFromCart(id))
  }
  return (
    <FixedLoader active={isLoading}>
      <div
        className="flex flex-col items-center px-16 pt-5 pb-12 bg-neutral-50 max-md:px-5"
        style={{ overflow: "hidden" }}
      >
        <MenuBarComponent />
        <div className="flex gap-5 max-md:flex-wrap items-stretch self-stretch mt-24 text-base tracking-wide leading-4 text-center whitespace-nowrap max-md:mt-10">
          <div className={`flex gap-2.5 items-center ${smUp && "me-7"}`} style={{ width: smUp && "100px" }}>
            <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
              1
            </div>
            <div className="self-stretch my-auto font-medium text-sky-950">BAG</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="justify-center items-center self-stretch px-4 pt-3 h-10 font-semibold text-white aspect-square bg-slate-400 rounded-[100px]">
              2
            </div>
            <div className="self-stretch my-auto font-medium uppercase text-slate-400">Delivery</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="justify-center items-center self-stretch px-4 pt-3 h-10 font-semibold text-white aspect-square bg-slate-400 rounded-[100px]">
              3
            </div>
            <div className="self-stretch my-auto font-medium text-slate-400">PAYMENT</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 justify-between items-stretch">
            <div className="justify-center items-center px-4 pt-3 h-10 font-semibold text-white aspect-square bg-slate-400 rounded-[100px]">
              4
            </div>
            <div className="grow my-auto font-medium text-slate-400">ORDER COMPLETE</div>
          </div>
        </div>
        <div className="justify-between mt-9 w-full max-w-[1155px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
            <div className="flex flex-col items-stretch w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch px-20 pt-6 pb-11 w-full font-medium bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 text-slate-600 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="text-4xl font-bold text-sky-950 max-md:mr-1 max-md:ml-0.5">Shopping Cart</div>
                {cartItems.length !== 0 && (
                  <div className="text-base tracking-wide leading-5 max-md:mr-1 max-md:ml-0.5">
                    Total (1 Item) $4.52{" "}
                  </div>
                )}
                {cartItems.length === 0 ? (
                  <div className="emptyCartContainer">
                    <RemoveShoppingCartSharp className="cartIcon" />

                    <Typography variant="h5" component="h1" className="cartHeading">
                      Your Shopping Cart is Empty
                    </Typography>
                    <Typography variant="body" className="cartText">
                      Nothin' to see here.
                    </Typography>
                    <Typography variant="body" className="cartText">
                      Let's get shopping!
                    </Typography>
                    <Link to="/products">
                      <Button className="justify-center items-center  cursor-pointer py-4 mt-3.5 text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] max-md:px-5 max-md:max-w-full">
                        Shop Now
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <>
                    {cartItems &&
                      cartItems.map((item) => (
                        // <Link
                        //   to="#"
                        //   style={{ textDecoration: "none", color: "none" }}
                        // >
                        <CartItem
                          key={item.productId}
                          item={item}
                          deleteCartItems={deleteCartItems}
                          setIsLoading={setIsLoading}
                          length={cartItems.length}
                          setUrl={setUrl}
                          id={item.productId}
                        />
                        // </Link>
                      ))}
                  </>
                )}
              </div>
            </div>
            {!!cartItems.length && (
              <div className="flex flex-col items-stretch ml-5 w-6/12 max-md:ml-0 max-md:w-full">
                <div className="flex flex-col items-stretch px-14 pt-6 pb-11 w-full bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                  <div className="text-3xl font-bold text-slate-600 max-md:max-w-full">Order Summary</div>
                  <div className="flex gap-5 justify-between items-stretch mt-6 text-2xl text-slate-600 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-auto font-medium">Original Price </div>
                    <div className="font-bold">${totalPrice + 2}</div>
                  </div>
                  <div className="flex gap-5 justify-between items-stretch mt-7 text-2xl text-slate-600 max-md:flex-wrap max-md:max-w-full">
                    <div className="font-medium">Discount </div>
                    <div className="font-bold">$2 </div>
                  </div>
                  <div className="shrink-0 mt-8 h-px bg-neutral-200 max-md:max-w-full" />
                  <div className="flex gap-5 justify-between items-stretch mt-8 text-slate-600 max-md:flex-wrap max-md:max-w-full">
                    <div className="flex-auto text-3xl font-black">Total Price</div>
                    <div className="my-auto text-2xl font-bold">${totalPrice} </div>
                  </div>
                  <div className="mt-3.5 text-2xl font-medium text-slate-600 max-md:max-w-full">
                    (Inclusive of all taxes){" "}
                  </div>
                  <div className="flex gap-2 justify-between items-stretch mt-3.5 text-2xl font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                    <div className="grow items-start px-10 pt-4 pb-3 bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5">
                      Coupon Code
                    </div>
                    <div className="items-stretch px-10 pt-3 cursor-pointer pb-3 text-white bg-indigo-500 rounded-md border border-indigo-500 border-solid max-md:px-5">
                      Apply
                    </div>
                  </div>
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/c4e5e2c76ecfdf518d664597924262e6525544416c1c8b9084370672c10f7bfe?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-center mt-3.5 aspect-[4.76] w-[459px] max-md:max-w-full"
                  />
                  <div
                    className="justify-center items-center  cursor-pointer py-4 mt-3.5 text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] max-md:px-5 max-md:max-w-full"
                    style={{ textAlign: "center" }}
                    onClick={checkoutHandler}
                  >
                    Checkout
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FixedLoader>
  )
}

export function AddressComponent({ setFormValue, variantId }) {
  const alert = useAlert()
  const dispatch = useDispatch()
  const history = useNavigate()
  const smUp = useMediaQuery("(max-width:600px)")
  const { shippingInfo } = useSelector((state) => state.cart)
  const [address, setAddress] = React.useState(shippingInfo.address || "")
  const [firstName, setFirstName] = React.useState(shippingInfo.firstName || "")
  const [lastName, setLastName] = React.useState(shippingInfo.lastName || "")
  const [city, setCity] = React.useState(shippingInfo.city || "")
  const [pinCode, setPinCode] = React.useState(shippingInfo.pinCode || "")
  const [state, setState] = React.useState(shippingInfo.state || "")
  const [country, setCountry] = React.useState(shippingInfo.country || "")
  const [phoneNo, setPhone] = React.useState(shippingInfo.phoneNo || "")
  const [email, setEmail] = React.useState(shippingInfo.email || "")
  const [countryList, setCountryList] = useState([])
  const [shippingCost, setShippingCost] = useState(0)
  const [saveAddress, setSaveAddress] = React.useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sameBillingDelivery, setSameBillingDelivery] = React.useState(false)
  const [isValidEmail, setIsValidEmail] = React.useState(true)
  const [isPhoneNoValid, setIsPhoneNoValid] = React.useState(true)
  const [isCallingApi, setIsCallingApi] = useState(false)

  const handleAddressChange = (event) => {
    setAddress(event.target.value)
  }

  useEffect(() => {
    if (variantId === "") {
      history("/cart")
    }
  }, [variantId])

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value)
  }

  const handleLastNameChange = (event) => {
    setLastName(event.target.value)
  }

  const handleCityChange = (event) => {
    setCity(event.target.value)
  }

  const handlePincodeChange = (event) => {
    setPinCode(event.target.value)
  }

  const handleStateChange = (event) => {
    setState(event.target.value || "")
  }

  const handleCountryChange = (value) => {
    console.log(value)
    setCountry(value)
  }

  const handlePhoneChange = (event) => {
    const newPhoneNo = event.target.value
    setPhone(newPhoneNo)
    setIsPhoneNoValid(newPhoneNo !== "" && newPhoneNo.length === 10)
  }

  const handleEmailChange = (event) => {
    const newEmail = event.target.value

    setEmail(newEmail)
    setIsValidEmail(newEmail === "" || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail))
  }

  const handleSaveAddressChange = (event) => {
    setSaveAddress(event.target.checked)
  }

  const handleSameBillingDeliveryChange = (event) => {
    setSameBillingDelivery(event.target.checked)
  }

  const placeOrder = async () => {
    setIsLoading(true)
    try {
      let url = `${API_URL}/create-order?variantId=${variantId.id}`
      const data = {
        name: `${firstName} ${lastName}`,
        address1: `${address}`,
        city: `${city}`,
        state_code: state ? `${state}` : undefined,
        country_code: `${country?.value}`,
        zip: `${pinCode}`,
        email: `${email}`,
        phone: `${phoneNo}`,
      }
      if (data.state_code === undefined || data.state_code === "") {
        data.state_code = " "
      }
      Object.keys(data).forEach((item) => {
        if (item) {
          url += `&${item}=${data[item]}`
        }
      })
      await fetch(`${url}`, {
        method: "POST",
        "Content-Type": "application/json",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setFormValue(data)
          setIsLoading(false)
          if (data.code !== 200) {
            alert.error(data?.error?.message)
            return
          }
          history("/process/payment")
        })
    } catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (address !== "" && city !== "" && country && pinCode !== "" && !isCallingApi) {
      getEstimates()
    }
  }, [address, city, state, country, pinCode])

  console.log(country)

  const getEstimates = async () => {
    setIsCallingApi(true)
    try {
      let url = `${API_URL}/get-estimates?`
      const data = {
        name: `${firstName} ${lastName}`,
        address1: `${address}`,
        city: `${city}`,
        state_code: `${state}`,
        country_code: `${country?.value}`,
        zip: `${pinCode}`,
        variant: variantId,
      }
      Object.keys(data).forEach((item) => {
        url += `&${item}=${data[item]}`
      })
      await fetch(`${url}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          setShippingCost(data?.result[0])
          console.log(data)
          if (data.code !== 200) {
            alert.error(data?.error?.message)
            setShippingCost(0)
            return
          }
        })
    } catch (error) {
      // setIsLoading(false);
      setShippingCost(0)
    } finally {
      setIsCallingApi(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      address === "" ||
      city === "" ||
      country?.value === "" ||
      (country?.value !== "GB" && state === "") ||
      pinCode === "" ||
      phoneNo === ""
    ) {
      alert.error("Please fill all the fields")
      return
    }

    // if (phoneNo && phoneNo.length !== 10) {
    //   alert.error("Phone Number should be 10 digits Long");
    //   return;
    // }

    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
        email,
        firstName,
        lastName,
      })
    )
    placeOrder()
  }
  const getCountries = async () => {
    try {
      fetch(`${API_URL}/countries`)
        .then((data) => data.json())
        .then((result) => {
          const resultData = result?.result?.map((country) => ({
            label: country.name,
            value: country.code,
            ...country,
          }))
          setCountryList(resultData)
        })
    } catch (error) {}
  }
  useEffect(() => {
    getCountries()
  }, [])
  return (
    <FixedLoader active={isLoading}>
      <div className="flex flex-col items-center px-16 pt-5 pb-12 bg-neutral-50 leading-[107%] max-md:px-5">
        <MenuBarComponent />
        <div className="flex gap-5 max-md:flex-wrap items-stretch self-stretch mt-24 text-base tracking-wide leading-4 text-center whitespace-nowrap max-md:mt-10">
          <div className={`flex gap-2.5 items-center ${smUp && "me-7"}`} style={{ width: smUp && "100px" }}>
            <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
              1
            </div>
            <div className="self-stretch my-auto font-medium text-sky-950">BAG</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
              2
            </div>
            <div className="self-stretch my-auto font-medium text-sky-950">Delivery</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="justify-center items-center self-stretch px-4 pt-3 h-10 font-semibold text-white aspect-square bg-slate-400 rounded-[100px]">
              3
            </div>
            <div className="self-stretch my-auto font-medium text-slate-400">PAYMENT</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 justify-between items-stretch">
            <div className="justify-center items-center px-4 pt-3 h-10 font-semibold text-white aspect-square bg-slate-400 rounded-[100px]">
              4
            </div>
            <div className="grow my-auto font-medium text-slate-400">ORDER COMPLETE</div>
          </div>
        </div>
        <div className="flex flex-col items-stretch px-20 pt-7 pb-12 mt-8 w-full bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-w-[1117px] max-md:px-5 max-md:max-w-full">
          <div className="text-4xl font-bold text-sky-950 max-md:mr-1 max-md:max-w-full">Shipping Address</div>
          <div className="flex gap-2.5 justify-between items-stretch mt-7 max-md:flex-wrap max-md:mr-1 max-md:max-w-full">
            <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
              <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">First Name </div>
              <input
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
                className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
              ></input>
            </div>
            <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
              <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">Last Name</div>
              <input
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
                className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
              ></input>
            </div>
          </div>
          <div className="mt-2.5 text-base font-bold uppercase text-slate-600 max-md:mr-1 max-md:max-w-full">
            Address
          </div>
          <input
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your address"
            className="justify-center items-start px-9 py-6 mt-1.5 text-lg font-medium bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:mr-1 max-md:max-w-full"
          ></input>
          <div className="flex gap-2.5 justify-between items-stretch mt-2.5 max-md:flex-wrap max-md:mr-1 max-md:max-w-full">
            <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
              <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">Country </div>
              {/* <div className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium lowercase whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full">
              Enter your country
            </div> */}

              <Select
                options={countryList}
                value={country}
                label="Country"
                onChange={handleCountryChange}
                className="justify-center items-start py-2.5 py-input pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
              />
            </div>
            <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
              <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">City </div>
              <input
                value={city}
                onChange={handleCityChange}
                placeholder="Enter your city"
                className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
              ></input>
            </div>
          </div>
          <div className="flex gap-2.5 justify-between items-stretch mt-2.5 max-md:flex-wrap max-md:mr-1 max-md:max-w-full">
            {["US", "AU", "CA", "JP"].includes(country?.value) &&
            countryList.filter((item) => item.code === country?.value)[0]?.states &&
            countryList.filter((item) => item.code === country?.value)[0]?.states?.length ? (
              <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
                <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">State</div>
                <MUISelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  className="justify-center items-start py-2.5 py-input pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
                  variant="outlined"
                  value={state}
                  label="Country"
                  onChange={handleStateChange}
                >
                  {countryList
                    .filter((item) => item.code === country.value)[0]
                    ?.states?.map((state) => {
                      return (
                        <MenuItem value={state.code} sx={{ color: "black" }}>
                          {state.name}
                        </MenuItem>
                      )
                    })}
                </MUISelect>
              </div>
            ) : (
              <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
                <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">State</div>
                <input
                  value={state}
                  onChange={handleStateChange}
                  placeholder="Enter State Code"
                  className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
                ></input>
              </div>
            )}
            <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
              <div className="text-base font-bold uppercase text-slate-600 max-md:max-w-full">Zip / Postal Code</div>
              <input
                value={pinCode}
                onChange={handlePincodeChange}
                placeholder="Enter your Zip/Postal Code"
                className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full"
              ></input>
            </div>
          </div>

          <div className="mt-2.5 text-base font-bold uppercase text-slate-600 max-md:mr-1 max-md:max-w-full">
            Phone{" "}
          </div>
          <PhoneInput
            className="justify-center outline-none items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:mr-1 max-md:max-w-full"
            value={phoneNo}
            onChange={setPhone}
            international
            defaultCountry="USA"
            placeholder="Enter Phone Number"
          />
          {/* <input
            value={phoneNo}
            onChange={handlePhoneChange}
            placeholder="Enter Phone Number"
            className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:mr-1 max-md:max-w-full"
          ></input> */}
          <div className="mt-2.5 text-base font-bold uppercase text-slate-600 max-md:mr-1 max-md:max-w-full">
            Email{" "}
          </div>
          <input
            value={email}
            onChange={handleEmailChange}
            required
            placeholder="Enter your email"
            className="justify-center items-start py-4 pr-16 pl-8 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:mr-1 max-md:max-w-full"
          ></input>
          <div className="flex gap-1.5 justify-center items-stretch self-start mt-6 text-base font-medium text-slate-600">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fdddf949e34d93154095b90ff1a63bd78b4541fac78974e474074e48c2869040?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-center my-auto aspect-square fill-zinc-300 w-[18px]"
            />
            <div className="flex-auto">Save to address book</div>
          </div>
          <div className={`flex gap-8 items-center ${smUp && "flex-col"}`}>
            <div
              className={`justify-center cursor-pointer items-center px-16 py-4 mt-6 max-w-full text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] w-[452px] max-md:px-5`}
              style={{ textAlign: "center" }}
              onClick={(e) => handleSubmit(e)}
            >
              Continue
            </div>
            {shippingCost !== 0 && (
              <div
                style={{
                  boxShadow: "-2px 1px 10px 0px rgba(0,0,0,0.75)",
                  borderRadius: "10px",
                  width: "350px",
                  height: "150px",
                }}
                className={smUp ? "pt-1" : `pt-2`}
              >
                <div
                  style={{
                    fontWeight: "600",
                    textAlign: "center",
                  }}
                >
                  Estimated Delivery
                </div>
                <div className="mt-3 ms-3 truncate">
                  Delivery Type:{" "}
                  <span className="ps-2" style={{ color: "gray" }}>
                    {shippingCost.name}
                  </span>{" "}
                </div>
                <div className="mt-2 ms-3">
                  Shipping Cost:{" "}
                  <span className="ps-2" style={{ color: "gray" }}>
                    ${shippingCost.rate}
                  </span>
                </div>
                <div className="mt-2 ms-3">
                  Min Del. Date:
                  <span className="ps-2" style={{ color: "gray" }}>
                    {shippingCost.minDeliveryDate}
                  </span>
                </div>
                <div className="mt-2 ms-3">
                  Max Del. Date:{" "}
                  <span className="ps-2" style={{ color: "gray" }}>
                    {shippingCost.maxDeliveryDate}
                  </span>
                </div>
              </div>
            )}
          </div>
          {/* <div
            className="justify-center cursor-pointer items-center px-16 py-4 mt-9 max-w-full text-xl font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] w-[452px] max-md:px-5"
            style={{ textAlign: "center" }}
            onClick={(e) => handleSubmit(e)}
          >
            Continue
          </div> */}
        </div>
      </div>
    </FixedLoader>
  )
}

export function PaymentComponent({ priceData, stripeKey }) {
  let paymentInstance = priceData.result
  const history = useNavigate()
  const alert = useAlert()
  const smUp = useMediaQuery("(max-width:600px)")
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  // const { user, loading } = useSelector((state) => state.userData)
  const { user } = useUserAuthContext()

  // const { error } = useSelector((state) => state.newOrder)
  const [isFocused, setIsFocused] = useState(false)
  const [nameOnCard, setNameOnCard] = React.useState("")
  const [couponCode, setCouponCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [stripeApiKey, setStripeApiKey] = useState()
  const [isValid, setIsValid] = useState(true)
  const [showDummyCard, setShowDummyCard] = useState(false)
  var db = getFirestore()

  const subTotal = cartItems.reduce((acc, currItem) => {
    return acc + currItem?.quantity * currItem?.price
  }, 0)

  const totalFinalPrice = paymentInstance?.costs?.total

  const updateOrderDb = async () => {
    try {
      await addDoc(collection(db, "Orders"), {
        userId: user.uid,
        orderId: priceData?.result?.id,
      })
      var templateParams = {
        from_name: "QR Lab Store",
        email_to: user?.email,
        name: user?.displayName,
        orderId: priceData?.result?.id,
        address: address,
        delivery: priceData?.result?.shipping,
        cost: final,
      }

      emailjs.send("service_9xueylh", "template_i0gjto6", templateParams, "L2mtJBITzxPkceqdD").then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text)
        },
        function (err) {
          console.log("FAILED...", err)
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleNameOnCardChange = (e) => {
    setNameOnCard(e.target.value)
  }

  const handleApplyCoupon = () => {
    // handle apply coupon logic
    setIsValid(false)
  }

  const handleFocus = (event) => {
    setIsFocused(event.target.value !== "")
  }

  const handleRadioChange = () => {
    setShowDummyCard(!showDummyCard)
  }

  const handleCloseDummyCard = () => {
    setShowDummyCard(false)
  }

  const address = `${shippingInfo.address} , ${shippingInfo.city} ${shippingInfo.state} , ${shippingInfo.pinCode} , ${shippingInfo.country?.code}`

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: subTotal,
    shippingPrice: 0,
    totalPrice: totalFinalPrice,
  }

  const paymentData = {
    // stripe takes payment in pese there for multiply with 100 bcz 1rs == 100 pese
    amount: Math.round(totalFinalPrice * 100),
  }

  let delivery =
    parseFloat(paymentInstance?.costs?.shipping) +
    parseFloat(paymentInstance?.costs?.tax) +
    parseFloat(paymentInstance?.costs?.vat)
  const paymentInfo = () => {
    const total = parseFloat(cartItems[0]?.price) + delivery
    return total
  }

  async function getStripeApiKey() {
    try {
      fetch(
        `${API_URL}/create-payment-intent?amount=${paymentInfo()}&email=${paymentInstance?.recipient?.email}&name=${
          paymentInstance?.recipient?.name
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setStripeApiKey(data?.clientSecret)
        })
    } catch (error) {
      // Handle error if the API call fails
      console.error("Error fetching Stripe API key:", error)
    }
  }

  useEffect(() => {
    getStripeApiKey()
  }, [])

  const confirmOrder = async (token) => {
    setIsLoading(true)
    await fetch(`${API_URL}/confirmOrder?id=${paymentInstance?.id}`, {
      method: "POST",
      mode: "cors",
    })
      .then((res) => res.json())
      .then(async (data) => {
        alert.success("Order Placed")
        await updateOrderDb()
        // dispatch(createOrder(data))
        history("/success")
        dispatch(removeItemFromCart(cartItems[0].id))
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
        alert.error("Error Occured")
      })
  }
  const handlePayament = async (token) => {
    setIsLoading(true)
    await fetch(`${API_URL}/pay?amount=${paymentInfo().toFixed(2)}`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    })
      .then((res) => res.json())
      .then(() => confirmOrder())
      .catch(() => {
        setIsLoading(false)
        alert.error("Error Occured")
      })
  }

  // claculte price after discount
  let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  console.log(paymentInstance)

  let discountedPrice = generateDiscountedPrice(totalPrice)
  let totalDiscount = totalPrice - discountedPrice
  let final = dispalyMoney(paymentInfo())
  // final = dispalyMoney(final);
  totalDiscount = dispalyMoney(totalDiscount)
  totalPrice = dispalyMoney(totalPrice)
  return (
    <FixedLoader active={isLoading}>
      <div className="flex flex-col items-center px-16 pt-5 pb-12 bg-neutral-50 max-md:px-5">
        <MenuBarComponent />
        <div className="flex gap-5 max-md:flex-wrap items-stretch self-stretch mt-24 text-base tracking-wide leading-4 text-center whitespace-nowrap max-md:mt-10">
          <div className={`flex gap-2.5 items-center ${smUp && "me-7"}`} style={{ width: smUp && "100px" }}>
            <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
              1
            </div>
            <div className="self-stretch my-auto font-medium text-sky-950">BAG</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
              2
            </div>
            <div className="self-stretch my-auto font-medium text-sky-950">Delivery</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 items-center">
            <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
              3
            </div>
            <div className="self-stretch my-auto font-medium text-sky-950">PAYMENT</div>
            {!smUp && (
              <div
                className="self-stretch my-auto max-w-full h-px bg-stone-500"
                style={{ width: "calc(100vh - 500px)" }}
              />
            )}
          </div>
          <div className="flex gap-2.5 justify-between items-stretch">
            <div className="justify-center items-center px-4 pt-3 h-10 font-semibold text-white aspect-square bg-slate-400 rounded-[100px]">
              4
            </div>
            <div className="grow my-auto font-medium text-slate-400">ORDER COMPLETE</div>
          </div>
        </div>
        <div className="mt-9 w-full max-w-[1156px] max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
            <div className="flex flex-col items-stretch w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col items-stretch px-7 py-11 w-full bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="text-4xl font-bold text-sky-950 max-md:max-w-full">Payment Method</div>
                <div className="flex flex-col justify-center items-stretch px-4 py-3.5 mt-6 text-base bg-violet-50 rounded-3xl text-slate-600 max-md:pr-5 max-md:max-w-full">
                  <div className="flex gap-2.5 justify-between items-stretch max-md:flex-wrap max-md:max-w-full">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/19c7dfc0d8d59b0e50d818659170c0e069ed3f11e6cbffa3557816e4cd1266be?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center my-auto w-7 aspect-[0.96] fill-slate-600"
                    />
                    <div className="flex-auto max-md:max-w-full">
                      Payments are SLL encrypted so your credit card and payments details stays safe{" "}
                    </div>
                  </div>
                </div>
                {/* <div className="flex flex-col items-stretch px-3.5 py-5 mt-3 bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:pr-5 max-md:max-w-full">
                  <div className="flex gap-3.5 items-stretch self-start text-3xl font-black whitespace-nowrap text-slate-600 max-md:flex-wrap">
                    <div className="grow">Credit Card</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/151848ed8308cc290061a07d7b969432075c22f2697a0ffd2c3df4b2d6e08e28?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center self-start w-7 aspect-[1.41] fill-slate-600"
                    />
                    <StripeCheckout
                      token={handlePayament}
                      stripeKey={stripeKey}
                    />
                  </div>
                  <div className="mt-6 text-base font-bold uppercase text-slate-600 max-md:max-w-full">
                    First Name{" "}
                  </div>
                  <div className="flex gap-5 justify-between items-stretch p-5 mt-1.5 text-lg font-medium bg-white rounded-md border border-solid border-zinc-300 text-sky-950 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
                    <div className=""></div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1669c610522e0ad2249984b20cf1207b7bf77be899e01b480e9a0b6f73a0678f?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center self-start mt-1 aspect-[3.03] fill-[linear-gradient(175deg,#222357_184.55%,#254AA5_9637.78%)] w-[42px]"
                    />
                  </div>
                  <div className="flex gap-5 justify-between items-start mt-11 uppercase max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                    <div className="flex flex-col flex-1 items-stretch">
                      <div className="text-base font-bold text-slate-600">
                        Expiry DATE{" "}
                      </div>
                      <div className="flex gap-5 justify-between items-stretch py-5 pr-2 pl-8 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:pl-5">
                        <div className="self-start mt-1.5">MM/YY</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/29b36bfbd252fdcb16d09f20be3ca8e6e68a21a000c7509e83adee7ef0600ec6?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center w-5 aspect-square"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 items-stretch">
                      <div className="text-base font-bold text-slate-600">
                        CVC{" "}
                      </div>
                      <div className="flex gap-5 justify-between items-stretch py-5 pr-2.5 pl-8 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:pl-5">
                        <div className="">CVC</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/fc3cbbfdc716193dfde86cd55a0b076b93a6eb78e4e7af7c5c5d2baadcd5fc69?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center w-5 aspect-square"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-1.5 text-base font-bold uppercase text-slate-600 max-md:max-w-full">
                    Name ON THE CARD{" "}
                  </div>
                  <div className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium whitespace-nowrap bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5 max-md:max-w-full">
                    Enter Your Name{" "}
                  </div>
                </div> */}
                <div className="flex flex-col items-stretch px-3.5 py-5 mt-3 bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:pr-5 max-md:max-w-full">
                  {stripeApiKey && (
                    <Elements
                      stripe={loadStripe(STRIPE_KEY)}
                      options={{ clientSecret: stripeApiKey }}
                    >
                      <CheckoutForm confirmOrder={confirmOrder} order={paymentInstance} />
                    </Elements>
                  )}
                </div>
                <div className="self-start mt-3 ml-3.5 text-sm font-light text-black underline max-md:ml-2.5">
                  By clicking “Place Order” you agree with{" "}
                  <span
                    className="font-medium underline truncate"
                    style={{ cursor: "pointer" }} // Change cursor to pointer when hovering over the span
                    onClick={() => history("/policy/privacy")} // Navigate only when this span is clicked
                  >
                    QR Lab Terms & Conditions
                  </span>{" "}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 w-6/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch px-12 py-9 w-full bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:px-5 max-md:mt-6 max-md:max-w-full">
                <div className="text-3xl font-bold text-slate-600 max-md:max-w-full">Order Summary</div>
                <div className="flex gap-5 justify-between items-stretch mt-6 text-2xl text-slate-600 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex-auto font-medium">Original Price </div>
                  <div className="font-bold">{dispalyMoney(cartItems[0]?.price)} </div>
                </div>
                <div className="flex gap-5 justify-between items-stretch mt-7 text-2xl text-slate-600 max-md:flex-wrap max-md:max-w-full">
                  <div className="font-medium">Shipping </div>
                  <div className="font-bold">{dispalyMoney(parseFloat(paymentInstance?.costs?.shipping))}</div>
                </div>
                <div className="shrink-0 mt-8 h-px bg-neutral-200 max-md:max-w-full" />
                <div className="flex gap-5 justify-between items-stretch mt-7 text-slate-600 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex-auto text-3xl font-black">Total Price</div>
                  <div className="my-auto text-2xl font-bold">{final} </div>
                </div>
                <div className="mt-1.5 text-2xl font-medium text-slate-600 max-md:max-w-full">
                  (Inclusive of all taxes){" "}
                </div>
                <div className="flex gap-2 justify-between items-stretch mt-1.5 text-2xl font-medium whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                  <div className="grow items-start px-10 pt-4 pb-3 bg-white rounded-md border border-solid border-zinc-300 text-slate-400 max-md:px-5">
                    Coupon Code
                  </div>
                  <div className="items-stretch px-10 pt-4 pb-3 text-white bg-indigo-500 rounded-md border border-indigo-500 border-solid max-md:px-5">
                    Apply
                  </div>
                </div>
                <img
                  loading="lazy"
                  srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ff8452fa764635e224f32db190c471efc17297e8b155cef965c8d0889e649327?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-center self-center mt-1.5 aspect-[5] w-[466px] max-md:max-w-full"
                />
                <div className="mt-9 text-4xl font-bold text-slate-600 max-md:max-w-full">Order Details</div>
                <div className="flex gap-5 justify-between items-stretch pr-4 mt-8 w-full text-slate-600 max-md:flex-wrap max-md:max-w-full">
                  <div className="flex gap-5 justify-between items-stretch">
                    <img
                      loading="lazy"
                      // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/d733087f9d97c2384dc3391393eb7d8213c66acefbbde3134d4596f73519fb97?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      src={cartItems[0]?.image}
                      className="object-center aspect-square w-[70px]"
                    />
                    <div className="flex flex-col flex-1 items-stretch my-auto">
                      <div className="text-base font-bold">{cartItems[0]?.name}</div>
                      <div className="mt-5 text-sm font-medium">Quantity: ( 1 )</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch my-auto font-bold">
                    <div className="text-base">Total</div>
                    <div className="mt-5 text-2xl">{final} </div>
                  </div>
                </div>
                <div className="shrink-0 mt-9 h-px bg-neutral-200 max-md:max-w-full" />
                <div className="mt-6 text-4xl font-bold text-slate-600 max-md:max-w-full">Delivery Address</div>
                <div className="mt-4 ml-2.5 text-base font-medium text-slate-600">{address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FixedLoader>
  )
}

export function OrderCompleteComponent(props) {
  const smUp = useMediaQuery("(max-width:600px)")
  const history = useNavigate()
  return (
    <div className="flex flex-col items-center px-16 pt-5 pb-12 text-base leading-4 bg-neutral-50 max-md:px-5">
      <MenuBarComponent />
      <div className="flex gap-5 max-md:flex-wrap items-stretch self-stretch mt-24 text-base tracking-wide leading-4 text-center whitespace-nowrap max-md:mt-10">
        <div className={`flex gap-2.5 items-center ${smUp && "me-7"}`} style={{ width: smUp && "100px" }}>
          <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
            1
          </div>
          <div className="self-stretch my-auto font-medium text-sky-950">BAG</div>
          {!smUp && (
            <div
              className="self-stretch my-auto max-w-full h-px bg-stone-500"
              style={{ width: "calc(100vh - 500px)" }}
            />
          )}
        </div>
        <div className="flex gap-2.5 items-center">
          <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
            2
          </div>
          <div className="self-stretch my-auto font-medium text-sky-950">Delivery</div>
          {!smUp && (
            <div
              className="self-stretch my-auto max-w-full h-px bg-stone-500"
              style={{ width: "calc(100vh - 500px)" }}
            />
          )}
        </div>
        <div className="flex gap-2.5 items-center">
          <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
            3
          </div>
          <div className="self-stretch my-auto font-medium text-sky-950">PAYMENT</div>
          {!smUp && (
            <div
              className="self-stretch my-auto max-w-full h-px bg-stone-500"
              style={{ width: "calc(100vh - 500px)" }}
            />
          )}
        </div>
        <div className="flex gap-2.5 justify-between items-stretch">
          <div className="justify-center items-center self-stretch px-4 pt-3 font-semibold text-white bg-indigo-500 shadow-sm aspect-square rounded-[100px]">
            4
          </div>
          <div className="self-stretch my-auto font-medium text-sky-950">ORDER COMPLETE</div>
        </div>
      </div>
      <div className="flex flex-col items-center px-20 py-12 mt-24 max-w-full text-4xl font-black bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 text-sky-950 w-[950px] max-md:px-5 max-md:mt-10">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ad15d5e11d90c2a3f83fdd7d1a3bacaf05560fe442ad1d4f6866e24255952365?apiKey=599dc50b3d834ed59f450af622cca86d&"
          className="object-center max-w-full aspect-square w-[134px]"
        />
        <div className="mt-7">Congratulations</div>
        <div className="mt-7 max-md:max-w-full text-center">Your order has been placed succesfully</div>
        <div
          onClick={() => history("/products")}
          className="cursor-pointer justify-center text-center items-center py-4 pr-16 pl-20 mt-7 mb-1 max-w-full text-xl text-white whitespace-nowrap bg-indigo-500 rounded-[30px] w-[464px] max-md:px-5"
        >
          Back to Shop
        </div>
      </div>
    </div>
  )
}
