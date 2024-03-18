import * as React from "react"
import { MenuBarComponent } from "./components/MenuBarComponent"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart } from "./actions/cartAction"
import { calculateDiscountMoney } from "./components/DisplayMoney"
import { useMediaQuery } from "@mui/material"
import { useMatch } from "react-router-dom"

export function ProductDetailsComponent(props) {
  const match = useMatch('/product/:id')
  const alert = useAlert()
  const dispatch = useDispatch()
  const smUp = useMediaQuery("(max-width:600px)")
  const { products, loading, error, success } = useSelector((state) => state.products)

  const product = products.filter((item) => item.id == match?.params?.id)[0] || {}

  // handling Add-to-cart
  const handleAddItem = () => {
    dispatch(addItemToCart(product, 1))
    alert.success("Item Added To Cart")
  }
  return (
    <div className="flex flex-col items-center pt-5 pb-12 bg-neutral-50">
      <MenuBarComponent />
      <div className={`mt-16 mr-4 ml-5 ${!smUp && "px-20"} max-md:mt-10 max-md:mr-2.5 max-md:max-w-full`}>
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
          <div className="flex flex-col items-stretch w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-stretch max-md:mt-8 max-md:max-w-full">
              <img
                loading="lazy"
                // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/7e58b0a0c1e2622ba61c2820a598414b17f31eff103b5102e9e07628ca22ccb1?apiKey=599dc50b3d834ed59f450af622cca86d&"
                src={product?.image}
                className={`object-center ml-4 max-w-full ${smUp ? "w-[350px]" : "w-[566px]"}`}
              />
              <div className="flex gap-2.5 justify-between items-center mt-24 max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/3f2364fb89566c575c1b56829f5890a5395f12080cf6d7d9c5f1d54541fa27a8?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-center self-stretch my-auto w-6 aspect-square"
                />
                <div className="justify-start self-stretch max-md:max-w-full">
                  <div className="flex max-md:flex-col max-md:gap-0 max-md:items-stretch">
                    <div
                      className="flex flex-col items-stretch w-6/12 max-md:ml-0 max-md:w-full"
                      style={{
                        border: "2px solid black",
                        borderRadius: "10px",
                      }}
                    >
                      <img
                        loading="lazy"
                        // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/05bc481d05537fec7335d1fbb15a3d336a2a4a907fa3c93615abd11b587909b9?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        src={product?.image}
                        className="object-center max-w-full aspect-square w-[215px] h-[115px] max-md:mt-5"
                      />
                    </div>
                    {/* <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center max-w-full aspect-square w-[115px] max-md:mt-5"
                      />
                    </div>
                    <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b6cfaa6dfd7674bb5705fd1eb8f2d462eba9dd627687c2266bb389e77fa879c0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center max-w-full aspect-square w-[115px] max-md:mt-5"
                      />
                    </div>
                    <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1543000edc80e4888e4652fbad324b2563ce894ebe2af016a64b1cf8f303f5d0?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center max-w-full aspect-square w-[115px] max-md:mt-5"
                      />
                    </div> */}
                  </div>
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/03dc9f9b1a398d755cd646a3cd6f970f0a56efab849648a9aee15da4a6140509?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-center self-stretch my-auto w-6 aspect-square"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-stretch ml-5 w-6/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-stretch px-6 pt-6 pb-3.5 w-full bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:px-5 max-md:mt-8 max-w-full">
              <div className="flex gap-0.5 justify-between items-stretch px-4 py-2 text-sm rounded-lg bg-slate-100 text-slate-400 max-md:flex-wrap max-md:max-w-full">
                <div className="">Home</div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6aa293c1eb3d7c562004db90a92203eaef79bd29632e04ec996770e1e53ea496?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-center my-auto w-4 aspect-square"
                />
                <div className="flex-auto font-medium text-sky-950">{product?.name}</div>
              </div>
              <div className="flex gap-5 justify-between items-stretch mt-7 w-full flex-wrap max-md:max-w-full">
                <div className="flex flex-col flex-1 items-stretch font-bold">
                  <div className="text-4xl whitespace-nowrap text-sky-950 truncate w-[350px]">{product?.name}</div>
                  <div className="mt-3 text-lg text-slate-600">{product?.size}</div>
                </div>
                <div className="flex gap-3.5 justify-center items-start self-start">
                  <div className="flex gap-2 justify-between items-stretch self-stretch px-2.5 py-2 text-base font-medium text-red-400 whitespace-nowrap bg-rose-50 rounded-xl">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0a950948626b113b1e960678cf0dc306b92b1b641593e058c26fce757331d869?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center self-start w-5 aspect-square"
                    />
                    <div className="">72</div>
                  </div>
                  <div className="flex flex-col justify-center items-center px-2 rounded-xl aspect-square bg-slate-100 h-[34px] w-[34px]">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/fbdb205dc2d8b56df1f0c9865024c9ef0c8874475863eca1760a4bf49c9da12f?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center w-full aspect-square"
                    />
                  </div>
                  <div className="flex flex-col justify-center items-center px-2 rounded-xl aspect-square bg-slate-100 h-[34px] w-[34px]">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/477a9f1ad1b8693fc63628d2dacaed0fd6911776198d946ee969360594d4927d?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center w-full aspect-square"
                    />
                  </div>
                </div>
              </div>
              <div className="shrink-0 mt-2.5 h-px bg-neutral-200 max-md:max-w-full" />
              <div className="flex gap-5 justify-between items-stretch mt-8 max-md:flex-wrap max-md:max-w-full">
                <div className="flex flex-col items-stretch font-bold whitespace-nowrap basis-0">
                  <div className="text-4xl text-indigo-500">${product?.price}</div>
                  <div className="mt-1.5 text-xl text-slate-600">${calculateDiscountMoney(product?.price)}</div>
                </div>
                <div className="flex flex-col flex-1 items-stretch my-auto text-sm">
                  <div className="flex gap-3 justify-between items-stretch font-medium">
                    <div className="flex gap-2 justify-between items-stretch px-6 py-2 text-orange-400 whitespace-nowrap bg-orange-50 rounded-3xl max-md:px-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/bdfb3fe016acfccb2835067845a10ca2b957f8f42936cd2600c2ae5bebe8188b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center my-auto w-4 aspect-square"
                      />
                      <div className="">4.8</div>
                    </div>
                    <div className="flex gap-2 justify-between items-stretch px-6 py-2 rounded-3xl bg-slate-100 text-slate-600 max-md:px-5">
                      <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/092f33ebe503a92e5843096f2af5d9c264e9a341ce255148226ceb1adf9301db?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center my-auto w-4 aspect-square"
                      />
                      <div className="flex-auto">67 Reviews</div>
                    </div>
                  </div>
                  <div className="mt-3.5 text-slate-600">
                    <span className="font-medium text-green-600">You save:</span>
                    <span className="text-slate-600"> {calculateDiscountMoney(product?.price) - product?.price}</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 mt-5 h-px bg-neutral-200 max-md:max-w-full" />
              <div className="mt-8 text-2xl font-black text-indigo-500 max-md:max-w-full">Description</div>
              <div className="mt-3.5 text-lg font-medium text-slate-600 max-md:max-w-full">
                {product?.productDescription ||
                  "Most QR codes are static. If any of the data changes, the QR code has to change. But QR Lab allows you to create dynamic"}
              </div>
              <div className="shrink-0 mt-2 h-px bg-neutral-200 max-md:max-w-full" />
              <div className="mt-8 text-base font-medium text-sky-950 max-md:max-w-full">Choose a Size</div>
              <div className="flex gap-3 items-stretch pr-20 mt-3.5 text-sm font-medium whitespace-nowrap text-stone-500 max-md:flex-wrap max-md:pr-5 max-md:max-w-full">
                {/* <div className="flex gap-2 justify-between items-stretch px-2.5 py-2 rounded-lg bg-slate-100 text-sky-950">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/883c034b903f440d60ad6078e209f9c298e58dafbaac04aa3b1e9cacca0cde3b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-4 aspect-square"
                  />
                  <div className="">Small</div>
                </div> */}
                <div className="flex gap-2 justify-between items-stretch px-2.5 py-2 rounded-lg bg-zinc-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/883c034b903f440d60ad6078e209f9c298e58dafbaac04aa3b1e9cacca0cde3b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-4 aspect-square"
                  />
                  <div className="">Medium</div>
                </div>
                {/* <div className="flex gap-2 justify-between items-stretch px-2.5 py-2 rounded-lg bg-zinc-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/208803703d534458e7d4938bc87b18b94fd55113652b06d38a21e3265669babe?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-4 aspect-square"
                  />
                  <div className="">Large</div>
                </div>
                <div className="flex gap-2 justify-between items-stretch px-2.5 py-2 rounded-lg bg-zinc-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/208803703d534458e7d4938bc87b18b94fd55113652b06d38a21e3265669babe?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-4 aspect-square"
                  />
                  <div className="grow">Extra Large</div>
                </div>
                <div className="flex gap-2 justify-between items-stretch px-2.5 py-2 rounded-lg bg-zinc-100">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/208803703d534458e7d4938bc87b18b94fd55113652b06d38a21e3265669babe?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-4 aspect-square"
                  />
                  <div className="">XXL</div>
                </div> */}
              </div>
              <div className="shrink-0 mt-6 h-px bg-neutral-200 max-md:max-w-full" />
              <div className="flex gap-5 justify-between items-stretch mt-8 whitespace-nowrap max-md:flex-wrap max-md:max-w-full">
                <div className="flex gap-5 justify-between items-center px-8 py-6 text-lg font-bold bg-zinc-100 rounded-[29.5px] text-sky-950 max-md:px-5">
                  <div className="self-stretch my-auto text-neutral-400">-</div>
                  <div className="self-stretch text-2xl">1</div>
                  <div className="self-stretch my-auto">+</div>
                </div>
                <div
                  className="cursor-pointer flex flex-col flex-1 justify-center items-center px-16 py-4 text-xl font-black text-white bg-indigo-500 rounded-[30px] max-md:px-5"
                  onClick={() => handleAddItem()}
                >
                  <div className="flex gap-2.5 items-stretch">
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/35425317f27a4fb9e967ca0e29ec1c49a8af9bc65c70373b6d3e618620667392?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-center my-auto aspect-square w-[21px]"
                    />
                    <div className="grow">Add To Cart</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between items-stretch p-4 mt-6 rounded-2xl border border-solid border-neutral-200 max-md:max-w-full">
                <div className="flex gap-3.5 justify-between items-stretch max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/8062b254d41b183ece4de66b85a75c492eb6ed8e7146997686fd780fcc676b61?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-7 aspect-square fill-neutral-100"
                  />
                  <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
                    <div className="text-2xl font-bold text-indigo-500 max-md:max-w-full">Affordable Delivery</div>
                    <div className="mt-2 text-base font-medium underline text-slate-600 max-md:max-w-full">
                      Enter your Postal code for Delivery Availability
                    </div>
                  </div>
                </div>
                <div className="shrink-0 mt-5 h-px bg-neutral-200 max-md:max-w-full" />
                <div className="flex gap-3.5 justify-between items-stretch mt-5 max-md:flex-wrap max-md:max-w-full">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5e3d72dbb15986a5f8004315d6e18ccfe1b554b08394fdb75c8600e5c6744d20?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-center self-start w-7 aspect-square"
                  />
                  <div className="flex flex-col flex-1 items-stretch max-md:max-w-full">
                    <div className="text-2xl font-bold text-indigo-500 max-md:max-w-full">Return Delivery</div>
                    <div className="mt-2 text-base underline text-slate-600 max-md:max-w-full">
                      <span className="font-medium text-slate-600">Free 30 days Delivery Return. </span>
                      <span className="font-medium underline text-slate-600">Details</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
