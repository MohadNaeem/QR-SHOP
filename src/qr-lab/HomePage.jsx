import * as React from "react"
import { MenuBarComponent } from "./components/MenuBarComponent" 
import { useMediaQuery } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import ReactGA from 'react-ga';


export function MyHomeComponent(props) {
  const navigate = useNavigate()
  const location = useLocation();
  const smUp = useMediaQuery("(max-width:600px)")
  const onNavigate = (link) => {
    navigate(`/${link}`)
  }
  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);
  return (
    <div className="flex flex-col items-stretch pt-5 pb-12 bg-neutral-50">
      {window.innerWidth < 700 ? (
        <MenuBarComponent />
      ) : (
        <div className="mx-auto" style={{ width: "80%" }}>
          <MenuBarComponent />
        </div>
      )}
      <div className="flex flex-col items-center px-16 w-full max-md:px-8 max-md:max-w-full">
        <div className={`${smUp ? "mt-2" : "mt-7"} justify-between self-stretch max-md:max-w-full`}>
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch align-center justify-center">
            <div className="flex flex-col items-stretch align-center w-[40%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col justify-between items-stretch self-stretch my-auto max-md:mt-10 max-md:max-w-full">
                <div className="text-7xl font-black text-sky-950 max-md:max-w-full max-md:text-4xl">
                  Welcome to
                  <br />
                  QR SHOP!
                </div>
                <div className="mt-6 text-2xl font-medium text-slate-600 max-md:max-w-full">
                  Your On-Demand QR Code Printing Hub with World Wide Shipping!
                </div>
                <div
                  className="flex gap-1.5 items-stretch self-start px-9 pt-3.5 pb-3.5 mt-6 bg-indigo-500 rounded-[30px] cursor-pointer max-md:px-5"
                  onClick={() => onNavigate("products")}
                >
                  <div className="grow text-xl font-bold tracking-wide leading-4 text-center text-white whitespace-nowrap">
                    Shop now
                  </div>
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cb7d715c5092f04148a624d2538a453e3f00e59bc68576bb2ea85056435bb08?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center shrink-0 self-start aspect-[0.54] stroke-[1.667px] stroke-white w-[7px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 mt-4 w-[54%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/085ec2a9f57c86b7e2b19ff165c53890f867f7cf5abd8cfc100b4a3bedd8aa7e?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="grow w-full aspect-[1.32] max-md:mt-3.5 max-md:max-w-full"
              />
            </div>
          </div>
        </div>
        <div className="justify-between mt-14 w-full max-w-[1139px] max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
            <div className="flex flex-col items-stretch w-4/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between items-center px-7 py-9 w-full bg-violet-100 rounded-[30px] max-md:px-5 max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/162a7a0faf227ce8130d47433912f6969fe5f26c5a28fc43dedbd02ab007c988?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-contain object-center aspect-[1.39] fill-slate-600 w-[71px]"
                />
                <div className="mt-6 text-xl font-black whitespace-nowrap text-zinc-900">Fast Delivery </div>
                <div className="self-stretch mt-5 text-base font-medium text-center text-black">
                  Fast delivery at your doorstep.
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between items-center px-7 py-9 w-full bg-violet-100 rounded-[30px] max-md:px-5 max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/8675647c531cbe83f38616b7fa14a19f4c0b6e7dd70cd70397f94536ba9490d8?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-contain object-center w-14 aspect-[0.85]"
                />
                <div className="mt-3.5 text-xl font-black whitespace-nowrap text-zinc-900">
                  Brand Warranty{" "}
                </div>
                <div className="self-stretch mt-3.5 text-base font-medium text-center text-black">
                  Experience peace of mind with our exclusive brand.
                </div>
              </div>
            </div> */}
            <div className="flex flex-col items-stretch ml-5 w-4/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between items-center px-7 py-9 w-full bg-violet-100 rounded-[30px] max-md:px-5 max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/139d5c581842838a060b25703156e78b8c31cbfa8f33b9c7557853fa78898b00?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-contain object-center w-14 aspect-[0.78]"
                />
                <div className="mt-3 text-xl font-black whitespace-nowrap text-zinc-900">Best Deals </div>
                <div className="self-stretch mt-3 text-base font-medium text-center text-black">
                  Curated selection of the best deals
                </div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 w-4/12 max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow justify-between items-stretch px-7 py-9 w-full bg-violet-100 rounded-[30px] max-md:px-5 max-md:mt-10">
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0d85152b00edf3857bda6dd7f889be7c6a0d69d25cec65b18c5d9673bd0cf11?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-contain object-center self-center aspect-[1.23] fill-slate-600 w-[63px]"
                />
                <div className="mt-6 text-xl font-black text-center whitespace-nowrap text-zinc-900">
                  Secure Payments
                </div>
                <div className="mt-5 text-base font-medium text-center text-black">
                  Shop confidently with secure payments
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center px-16 py-12 mt-10 w-full bg-sky-950 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-stretch mt-14 mb-7 w-full max-w-[1139px] max-md:mt-10 max-md:max-w-full">
          <div className="self-center text-5xl font-black text-white max-md:text-4xl">Featured Products</div>
          <div className="justify-between mt-14 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
              <div className="flex flex-col items-stretch w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/50c9a279bf62e9d72595dd87cf69bdd51edd3e43d8d4a4d0c98a198f40e96a59?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1 justify-between items-stretch px-0.5 mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Business Cards</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/297b6e3a868aa4b228d7a5dc8c3d3745c596e3c489a19f664acafa1d7e2c440b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/684d09a6c483bd8e5cb7d2926d94c709873ea6f7ea6cb5c0d296b601359f62ba?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1 justify-between items-stretch pr-1.5 mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Stickers</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/339e3a6ce0c653de544dbd39e97c099b0b746b99946ad707cb96f33b47e821cf?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/0adddbc2a7ff96de5b04bb8b21778a4f5ddf061359f32eb28455f01963ef5ddc?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1.5 justify-between items-stretch px-0.5 mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Menus</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ccf663855037d32a0d14ddc8c4c4c705d57595be4ff32cdd31aaf8bbabeb8ff?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div
                className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full"
                onClick={() => onNavigate("products")}
              >
                <div className="flex flex-col grow items-stretch py-px max-md:mt-10">
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/5519967a6c8279055df8019443e5014511f738c4ab3000dc5fe6d1055e524d61?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1 justify-between items-stretch px-0.5 mt-5">
                    <div className="flex-auto text-base font-medium text-white">Shop Stickers</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/297b6e3a868aa4b228d7a5dc8c3d3745c596e3c489a19f664acafa1d7e2c440b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-between mt-12 max-md:mt-10 max-md:max-w-full">
            <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
              <div className="flex flex-col items-stretch w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc38863a52ad784f5758d4235206920b1d666b940e008334d1f7c8edeaf742ac?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1.5 justify-between items-stretch pr-2 mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Labels</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/297b6e3a868aa4b228d7a5dc8c3d3745c596e3c489a19f664acafa1d7e2c440b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/a842f4915066f8ac746710546ddd5a06da768820ad9e47b1da35067751dfdc94?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1 justify-between items-stretch pr-1.5 mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Key Chains</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/339e3a6ce0c653de544dbd39e97c099b0b746b99946ad707cb96f33b47e821cf?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/3ca1e944fd2b520309342cbf99d34494cf1df0e88e11d77d5a6aef3c826c37bd?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1 justify-between items-stretch px-px mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Wooden Table Tops</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9ee9f9601e8f66600e2a910b1719c18156c7c61dfcebefcaef4042bb2efc1d57?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 self-start mt-1 aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-stretch ml-5 w-3/12 max-md:ml-0 max-md:w-full">
                <div
                  className="flex flex-col grow justify-between items-stretch py-px max-md:mt-10"
                  onClick={() => onNavigate("products")}
                >
                  <img
                    loading="lazy"
                    srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/cb99a0bc51f794dc843cfed4237304197e5ec91a0dba5dc8d2dd30cb1a00b6f8?apiKey=599dc50b3d834ed59f450af622cca86d&"
                    className="object-contain object-center w-full aspect-[1.47]"
                  />
                  <div className="flex gap-1 justify-between items-stretch px-px mt-4">
                    <div className="flex-auto text-base font-medium text-white">Shop Dog-ID QR Codes</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/297b6e3a868aa4b228d7a5dc8c3d3745c596e3c489a19f664acafa1d7e2c440b?apiKey=599dc50b3d834ed59f450af622cca86d&"
                      className="object-contain object-center shrink-0 my-auto aspect-[0.56] stroke-[1.667px] stroke-white w-[5px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="justify-between self-center pt-9 mt-28 w-full max-w-[1091px] max-md:mt-10 max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
          <div className="flex flex-col items-stretch w-[57%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow justify-center items-center px-16 py-px mt-3.5 w-full rounded-[30px] max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <img
                loading="lazy"
                srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/86c17d2d4b85ab16ac73b69b6cfdb91baaf73673ac9fb7761b04eddd17fbfc11?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="object-contain object-center z-10 mt-0 max-w-full aspect-[0.55] w-[268px]"
              />
            </div>
          </div>
          <div className="flex flex-col items-stretch ml-5 w-[43%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col items-stretch px-5 max-md:mt-10 max-md:max-w-full">
              <div className="text-5xl font-bold text-sky-950 max-md:max-w-full max-md:text-4xl">
                High-Quality Materials & Instant Printing
              </div>
              <div className="mt-5 text-2xl font-medium text-slate-600">
                We use premium materials to guarantee the durability of your QR codes. Whether it's for a business card,
                flyer, or promotional material, our prints are designed to leave a lasting impression
              </div>
              <div className="flex gap-1.5 mt-2 items-stretch self-start px-9 pt-3.5 pb-3.5 mt-5 bg-indigo-500 rounded-[30px] max-md:px-5">
                <div
                  className="grow text-xl font-bold tracking-wide leading-4 text-center text-white whitespace-nowrap"
                  onClick={() => onNavigate("products")}
                >
                  Shop now
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/6cb7d715c5092f04148a624d2538a453e3f00e59bc68576bb2ea85056435bb08?apiKey=599dc50b3d834ed59f450af622cca86d&"
                  className="object-contain object-center shrink-0 self-start aspect-[0.54] stroke-[1.667px] stroke-white w-[7px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`pl-20 mt-14 w-full bg-sky-950 max-md:pl-5 max-md:mt-10 max-md:max-w-full ${
          smUp ? "py-3 pb-7" : "py-0.5"
        }`}
      >
        <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
          <div className="flex flex-col items-stretch w-[62%] max-md:ml-0 max-md:w-full">
            <div className="flex flex-col justify-between items-center self-stretch my-auto max-md:mt-10 max-md:max-w-full">
              <div className="text-5xl font-black tracking-wide leading-4 text-center text-white max-md:max-w-full max-md:text-4xl">
                Subscribe to our newsletter
              </div>
              <div
                className="mt-7 text-xl font-medium tracking-wide leading-4 text-center text-slate-400 max-md:max-w-full"
                style={{ lineHeight: "24px" }}
              >
                Want product updates and news? Sign up for our Newsletter
              </div>
              <div
                className={`flex gap-5 justify-between items-stretch self-stretch mt-8 max-md:flex-wrap max-md:max-w-full ${
                  smUp ? "flex-col" : ""
                }`}
              >
                <div className="grow justify-center items-center px-16 py-4 text-xl font-medium tracking-wide leading-4 text-center whitespace-nowrap border-2 border-solid backdrop-blur-[100px] bg-white bg-opacity-40 border-black border-opacity-20 rounded-[30px] text-slate-400 max-md:px-5 max-md:max-w-full">
                  Email Address
                </div>
                <div className="justify-center items-stretch px-7 py-4 text-xl font-medium tracking-wide leading-4 text-center text-white bg-cyan-400 border-2 border-solid backdrop-blur-[100px] border-black border-opacity-20 rounded-[30px] max-md:px-5">
                  Subscribe
                </div>
              </div>
            </div>
          </div>
          {!smUp && (
            <div className="flex flex-col items-stretch ml-5 w-[38%] max-md:ml-0 max-md:w-full">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/b541d9ae72783b1bd0c8b9a1d84b48a828b276b9b8c195a102a87da1e43469a4?apiKey=599dc50b3d834ed59f450af622cca86d&"
                className="object-contain object-center grow justify-end items-center w-full aspect-[1.49]"
              />
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5 justify-between items-stretch self-center mt-20 w-full max-w-[1090px] max-md:flex-wrap max-md:mt-10 max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col justify-between items-stretch self-start basis-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d5b0b8d21f81131cfd0c2336e18c3b62c9d53cd10e2ebc8cbdee59865a116e75?apiKey=599dc50b3d834ed59f450af622cca86d&"
            className="object-contain object-center aspect-square fill-indigo-500 w-[41px]"
          />
          <div className="flex gap-1 justify-between items-stretch pr-16 mt-5 max-md:pr-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f5a24748d72922531b97a19c4a302812bcd8a3af3bb423fdd3f444525c4f9b4a?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-contain object-center shrink-0 w-5 aspect-square fill-slate-600"
            />
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/a67804ae4434182af2130383a4fa978aea668c77b210e9c6d646fc428e2f15c1?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-contain object-center shrink-0 w-5 aspect-square fill-slate-600"
            />
          </div>
          <div className="flex gap-0.5 justify-between items-stretch pr-5 mt-5">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/6e2f315659add8126a459bd1c39d520034fa092215de6a138f770f2694c9abd3?apiKey=599dc50b3d834ed59f450af622cca86d&"
              className="object-contain object-center shrink-0 w-5 aspect-square"
            />
            <div className="grow my-auto text-lg tracking-wide leading-4 text-center text-slate-600">English(uk)</div>
          </div>
        </div>
        <div className="px-5 max-md:max-w-full">
          <div className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:items-stretch">
            <div className="flex flex-col items-stretch w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Home</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Qr Lab</div>
                <div className="mt-6 leading-[89%]">Contacts & Help Line</div>
                <div className="mt-6 leading-[89%] max-md:mt-10" onClick={() => navigate.push("/policy/privacy")}>
                  Terms of Service and Privacy Policy
                </div>
              </div>
            </div>
            {/* <div className="flex flex-col items-stretch ml-5 w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Products</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 w-[29%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Products</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
              </div>
            </div>
            <div className="flex flex-col items-stretch ml-5 w-[14%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col grow items-stretch text-lg font-medium tracking-wide text-center whitespace-nowrap text-slate-600 max-md:mt-10">
                <div className="font-bold leading-[89%]">Products</div>
                <div className="mt-11 leading-[89%] max-md:mt-10">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
                <div className="mt-6 leading-[89%]">Products</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="self-center mt-20 text-lg tracking-wide leading-4 text-center whitespace-nowrap text-slate-600 max-md:mt-10">
        © 2024 TheLabGroup
      </div>
    </div>
  )
}
