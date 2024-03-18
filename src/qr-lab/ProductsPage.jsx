import { useMediaQuery } from "@mui/material"
import * as React from "react"
import { MenuBarComponent } from "./components/MenuBarComponent"
import { useDispatch, useSelector } from "react-redux"
import { addItemToCart } from "./actions/cartAction"
import { useAlert } from "react-alert"
import { useNavigate } from "react-router-dom"

export const calculateDiscountMoney = (originalPrice) => {
  return parseFloat(originalPrice) + 2
}

export function ProductsPage(props) {
  const smUp = useMediaQuery("(max-width:600px)")
  const alert = useAlert()
  const navigate = useNavigate()
  const { products } = useSelector((state) => state.products)
  const dispatch = useDispatch()
  const addTocartHandler = (product) => {
    dispatch(addItemToCart(product, 1))
    alert.success("Item Added To Cart")
  }

  const getSizes = async () => {
    await fetch(`http://localhost:3030/productSizes`)
      .then((res) => res.json())
      .then((data) => console.log(data))
  }
  React.useEffect(() => {
    getSizes()
  }, [])
  return (
    <div className="flex flex-col items-center pt-5 pb-12 bg-neutral-50">
      <MenuBarComponent />
      <div
        className={`self-stretch pl-20 mt-12 w-full bg-sky-950 max-md:pl-5 max-md:mt-10 max-md:max-w-full ${
          smUp && "pb-7"
        }`}
      >
        <div className="flex gap-5  max-md:gap-0 max-md:items-stretch products-left">
          <div className="flex flex-col items-stretch w-[29%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/b3f17c0f408ddf833f8447144f432ba96392250457687811c058d55d39b06bfb?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-center self-stretch my-auto max-w-full aspect-[1.3] w-[281px] max-md:mt-6"
            />
          </div>
          <div className="flex flex-col items-stretch ml-5 w-[19%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-stretch self-stretch my-auto mx-auto tracking-wide text-center text-white whitespace-nowrap max-md:mt-10">
              <div className="text-5xl font-bold leading-4 max-md:text-4xl">Products</div>
              <div className="self-center mt-7 text-base font-medium leading-4">Home / Products</div>
            </div>
          </div>
          <div className="flex flex-col items-stretch ml-5 w-[53%] max-md:ml-0 max-md:w-full">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/baeb25acbfbfd9bf5a5089191d0d4ce5c389cda1669c22efc150b054e1f57c86?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-center grow w-full aspect-[2.33] max-md:mt-3.5 max-md:max-w-full"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 w-full max-w-[1140px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
          {!smUp && (
            <div className="flex flex-col items-stretch w-[18%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch py-11 pr-16 pl-6 w-full text-base font-bold leading-4 bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 text-slate-600 max-md:px-5 max-md:mt-6">
                <div className="text-2xl text-sky-950">Categories</div>
                <div className="mt-4 tracking-wide text-center text-indigo-500 whitespace-nowrap">All Products</div>
                <div className="mt-5 tracking-wide text-center">Best Selling</div>
                <div className="mt-4 tracking-wide text-center whitespace-nowrap">My Favorites </div>
              </div>
            </div>
          )}
          <div className="flex flex-col items-stretch ml-5 w-[82%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow items-stretch px-5 py-7 w-full bg-white rounded-3xl border-solid border-[0.5px] border-zinc-200 max-md:mt-6 max-md:max-w-full">
              <div className="justify-between max-md:max-w-full">
                {smUp ? (
                  <div className={`flex gap-5 flex-wrap max-md:flex-col max-md:gap-0 max-md:items-stretch`}>
                    {products &&
                      products.map((product) => {
                        return (
                          <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/product/${product.id}`)
                            }}
                            style={{
                              textDecoration: "none",
                              color: "inherit",
                              maxWidth: "350px",
                              margin: "auto",
                            }}
                          >
                            <div
                              className={`flex flex-col items-stretch w-[250px] max-md:ml-0 max-md:w-full ${
                                smUp && "mt-5"
                              }`}
                            >
                              <div
                                className="flex flex-col grow items-stretch px-5 py-5 mx-auto text-base font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8"
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  maxWidth: "350px",
                                  margin: "auto",
                                }}
                              >
                                <img
                                  loading="lazy"
                                  // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                  src={product?.image}
                                  className="object-center w-full"
                                />
                                <div className="flex gap-5 justify-between items-stretch mt-2.5 text-slate-600">
                                  <div className="h-[30px] truncate">{product.name}</div>
                                  <img
                                    loading="lazy"
                                    src={product?.image}
                                    className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                                  />
                                </div>
                                <div className="mt-2 text-base text-indigo-500">
                                  <span className="font-bold">${product?.price}</span>
                                  <span className="font-bold text-indigo-500 line-through ms-3">
                                    ${calculateDiscountMoney(product?.price)}
                                  </span>
                                </div>
                                <div
                                  className="cursor-pointer flex flex-col items-center justify-center items-stretch px-10 py-2.5 mt-3.5 w-full font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] max-md:px-5"
                                  onClick={(e) => {
                                    e.stopPropagation()
                                    addTocartHandler(product)
                                  }}
                                  style={{ alignItems: "center" }}
                                >
                                  <div className="flex gap-2.5 justify-between">
                                    <img
                                      loading="lazy"
                                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/94e193c3aa21b7ed0fba44773f18c4947d0af41a48fa978cf0a94ff9e698a3f1?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                      className="object-center aspect-[1.12] w-[18px]"
                                    />
                                    <div className="grow">Add To Cart</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                ) : (
                  <div className={`flex gap-5 flex-wrap max-md:flex-col max-md:gap-0 max-md:items-stretch`}>
                    {products &&
                      products.map((product) => {
                        return (
                          <div
                            className="cursor-pointer w-[260px]"
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate(`/product/${product.id}`)
                            }}
                          >
                            <div
                              className="flex flex-col grow items-stretch px-5 py-5 mx-auto text-base font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8"
                              style={{ overflow: "hidden" }}
                            >
                              <img
                                loading="lazy"
                                // srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                src={product?.image}
                                className="object-center"
                                style={{
                                  height: "300px",
                                  transform: product.id === 12917 &&  "scaleX(2)",
                                }}
                              />
                              <div className="flex gap-5 justify-between items-stretch mt-2.5 text-slate-600">
                                <div className="h-[30px] truncate">{product.name}</div>
                                <img
                                  loading="lazy"
                                  src={product?.image}
                                  className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                                />
                              </div>
                              <div className="mt-2 text-base text-indigo-500">
                                <span className="font-bold">${product?.price}</span>
                                <span className="font-bold text-indigo-500 line-through ms-3">
                                  ${calculateDiscountMoney(product?.price)}
                                </span>
                              </div>
                              <div
                                className="cursor-pointer flex flex-col items-center justify-center items-stretch px-10 py-2.5 mt-3.5 w-full font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] max-md:px-5"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  addTocartHandler(product)
                                }}
                                style={{ alignItems: "center" }}
                              >
                                <div className="flex gap-2.5 justify-between">
                                  <img
                                    loading="lazy"
                                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/94e193c3aa21b7ed0fba44773f18c4947d0af41a48fa978cf0a94ff9e698a3f1?apiKey=599dc50b3d834ed59f450af622cca86d&"
                                    className="object-center aspect-[1.12] w-[18px]"
                                  />
                                  <div className="grow">Add To Cart</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                )}
                {/* <div className="flex gap-5 flex-wrap max-md:flex-col max-md:gap-0 max-md:items-stretch">
                  <div className="flex flex-col items-stretch w-[250px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow items-stretch px-5 py-5 mx-auto w-full text-base font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/692099246125da5d11f638b2a5877f4c853636426be58c65cbe00da80f44552b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center w-full aspect-[1.25]"
                      />
                      <div className="flex gap-5 justify-between items-stretch mt-2.5 text-slate-600">
                        <div className="">Stickers deal</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5bcfed58f10aec158615c37d0552543db472f58b8fdda56aa279f0ce4480619?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                        />
                      </div>
                      <div className="mt-2 text-base text-indigo-500">
                        <span className="font-bold">$10 </span>
                        <span className="font-bold text-indigo-500 line-through">
                          $15.62
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-stretch px-14 py-2.5 mt-2.5 w-full font-black text-white whitespace-nowrap bg-indigo-500 rounded-[30px] max-md:px-5">
                        <div className="flex gap-2.5 justify-between items-stretch">
                          <img
                            loading="lazy"
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/94e193c3aa21b7ed0fba44773f18c4947d0af41a48fa978cf0a94ff9e698a3f1?apiKey=599dc50b3d834ed59f450af622cca86d&"
                            className="object-center aspect-[1.12] w-[18px]"
                          />
                          <div className="grow">Add To Cart</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch ml-5 w-[250px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-stretch px-5 pt-5 pb-11 mx-auto w-full font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/46a6c2a89b7301ab3e886a711e17f0c2dabe273c9f8cbb85fc7fc79d68812801?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center w-full aspect-[1.25]"
                      />
                      <div className="flex gap-5 justify-between items-stretch mt-2.5 text-base whitespace-nowrap text-slate-600">
                        <div className="">Flyers</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12651d59daf80126fdacea7d539d6b235098a912ea0176e2b99deaa6fcae921?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                        />
                      </div>
                      <div className="mt-2.5 text-base text-indigo-500">
                        <span className="font-bold">$16 </span>
                        <span className="font-bold text-indigo-500 line-through">
                          $18 .62
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch ml-5 w-[250px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col items-stretch px-5 pt-5 pb-11 mx-auto w-full font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/ba31a9073240bc9fad0fbbfcf8180df98bb9ecc73c3e2d0e0fd84ddb605bce6d?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center w-full aspect-[1.25]"
                      />
                      <div className="flex gap-5 justify-between items-stretch mt-2.5 text-base whitespace-nowrap text-slate-600">
                        <div className="">Keychain</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12651d59daf80126fdacea7d539d6b235098a912ea0176e2b99deaa6fcae921?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                        />
                      </div>
                      <div className="mt-2.5 text-base text-indigo-500">
                        <span className="font-bold">$8 </span>
                        <span className="font-bold text-indigo-500 line-through">
                          $12.62
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch w-[250px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow items-stretch px-5 pt-5 pb-11 mx-auto w-full font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/b66013b12d74567dcd4d9e74668cefc6a9312d987dcf5271837f3780668c29c1?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center w-full aspect-[1.25]"
                      />
                      <div className="flex gap-5 justify-between items-stretch mt-2.5 text-base text-slate-600">
                        <div className="">QR tags</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12651d59daf80126fdacea7d539d6b235098a912ea0176e2b99deaa6fcae921?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                        />
                      </div>
                      <div className="mt-2.5 text-base text-indigo-500">
                        <span className="font-bold">$5 </span>
                        <span className="font-bold text-indigo-500 line-through">
                          $8.62
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch ml-5 w-[250px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow items-stretch px-5 pt-5 pb-11 mx-auto w-full font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/346c4043083ef9d87e66f985422c249e67c4afcd1ba9d3e9b0f7d6f1c44e6d7e?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center w-full aspect-[1.25]"
                      />
                      <div className="flex gap-5 justify-between items-stretch mt-2.5 text-base text-slate-600">
                        <div className="flex-auto">Wooden QR code </div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12651d59daf80126fdacea7d539d6b235098a912ea0176e2b99deaa6fcae921?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                        />
                      </div>
                      <div className="mt-2.5 text-base text-indigo-500">
                        <span className="font-bold">$22 </span>
                        <span className="font-bold text-indigo-500 line-through">
                          $25.62
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-stretch ml-5 w-[250px] max-md:ml-0 max-md:w-full">
                    <div className="flex flex-col grow items-stretch px-5 pt-5 pb-11 mx-auto w-full font-medium rounded-3xl border border-solid bg-zinc-50 border-neutral-200 max-md:mt-8">
                      <img
                        loading="lazy"
                        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/8b4764c86aea3a189ff44ac630e52c1a15139c63085a456d46a6404a3cb504fa?apiKey=599dc50b3d834ed59f450af622cca86d&"
                        className="object-center w-full aspect-[1.25]"
                      />
                      <div className="flex gap-5 justify-between items-stretch mt-2.5 text-base text-slate-600">
                        <div className="">Business card</div>
                        <img
                          loading="lazy"
                          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b12651d59daf80126fdacea7d539d6b235098a912ea0176e2b99deaa6fcae921?apiKey=599dc50b3d834ed59f450af622cca86d&"
                          className="object-center my-auto w-4 aspect-[1.23] fill-slate-600"
                        />
                      </div>
                      <div className="mt-2.5 text-base text-indigo-500">
                        <span className="font-bold">$17 </span>
                        <span className="font-bold text-indigo-500 line-through">
                          $20.62
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* <div className="justify-between mt-8 max-md:max-w-full">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch"></div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
