import * as React from "react"
import { useEffect } from "react"
import { MenuBarComponent } from "./components/MenuBarComponent"
import { useUserAuthContext } from "./context/AuthContext"
import GooglePhoto from "./assets/google.png"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function LoginQrLab(props) {
  const { googleSignin, user, signIn, signUp } = useUserAuthContext()
  const [isSignUp, setIsSignUp] = useState(false)
  const [name, setName] = useState("")
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (user?.uid) {
      navigate("/cart")
    }
  }, [user])

  return (
    <>
      <div className="flex flex-col items-stretch pt-5 pb-12 bg-neutral-50">
        {window.innerWidth < 700 ? (
          <MenuBarComponent />
        ) : (
          <div className="mx-auto" style={{ width: "80%" }}>
            <MenuBarComponent />
          </div>
        )}{" "}
        <div
          className="bg-neutral-50 rounded-[50px] pt-12 mt-4"
          style={{
            height: "150vh",
          }}
        >
          <div
            className="flex gap-5 max-md:flex-col max-md:gap-0 max-md:"
            style={{
              margin: "auto",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="flex flex-col ml-5 w-[41%] max-md:ml-0 max-md:w-full">
              <div className="flex flex-col self-stretch px-16 py-11 my-auto w-full font-bold bg-white rounded-3xl border border-solid shadow-2xl border-neutral-200 max-md:px-5 max-md:mt-10 max-md:max-w-full">
                <div className="text-3xl text-center text-sky-950">Account Sign {isSignUp ? "Up" : "In"}</div>
                {isSignUp && (
                  <div className="mt-6 text-base uppercase text-slate-600">
                    <div className="mt-3.5 text-base uppercase text-slate-600">Name </div>
                    <div className="justify-center items-start py-5 pr-16 pl-7 mt-1.5 text-lg font-medium lowercase bg-white rounded-md border border-solid shadow-sm border-zinc-300 text-slate-400 max-md:px-5">
                      <input
                        style={{
                          outline: "none",
                          minWidth: "300px",
                        }}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                      ></input>
                    </div>
                  </div>
                )}
                <div className="mt-6 text-base uppercase text-slate-600">Email </div>
                <div className="justify-center items-start py-6 pr-16 pl-7 mt-1.5 text-lg font-medium lowercase whitespace-nowrap bg-white rounded-md border border-solid shadow-sm border-zinc-300 text-slate-400 max-md:px-5">
                  {/* <span className="uppercase">e</span>nter your email */}
                  <input
                    style={{
                      outline: "none",
                      minWidth: "300px",
                    }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  ></input>
                </div>
                <div className="mt-3.5 text-base uppercase text-slate-600">Password </div>
                <div className="justify-center items-start py-5 pr-16 pl-7 mt-1.5 text-lg font-medium lowercase bg-white rounded-md border border-solid shadow-sm border-zinc-300 text-slate-400 max-md:px-5">
                  {/* <span className="uppercase">e</span>nter your password */}
                  <input
                    style={{
                      outline: "none",
                      minWidth: "300px",
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  ></input>
                </div>
                <div className="mt-3.5 text-sm capitalize text-slate-600">Forget password? </div>
                <div
                  className={`flex flex-col mx-auto flex-1 mt-4 justify-center text-xl leading-4 text-white ${
                    window.innerWidth <= 670 ? "w-[300px]" : "w-[400px]"
                  }`}
                >
                  <div
                    onClick={async () => {
                      if (isSignUp) {
                        const data = await signUp(email, password)
                      } else {
                        signIn(email, password)
                      }
                    }}
                    style={{
                      alignItems: "center",
                    }}
                    className="flex align-center cursor-pointer gap-3.5 justify-between px-7 py-7 bg-indigo-500 rounded-[30px] max-md:px-5"
                  >
                    <img src={""}></img>
                    <div>Sign {isSignUp ? "Up" : "In"}</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4df99f6de50777597ab3bc6f1fb4013a3f5b61c903e49d8ea6b771b3da6845df?"
                      className="my-auto w-1.5 aspect-[0.55] stroke-[1.667px] stroke-white"
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-between mt-6 tracking-wide text-center whitespace-nowrap">
                  <div className="grow my-auto text-base leading-4 text-indigo-500 underline">
                    <span className="text-slate-600">
                      {isSignUp ? "Already have an account?" : "Don’t have an account?"}
                    </span>{" "}
                    <span
                      className="text-indigo-500 underline cursor-pointer"
                      onClick={() => setIsSignUp((prev) => !prev)}
                    >
                      {isSignUp ? "Login" : "Register"}
                    </span>
                  </div>
                </div>
                <div
                  className={`flex flex-col mx-auto flex-1 mt-4 justify-center text-xl leading-4 text-white ${
                    window.innerWidth <= 670 ? "w-[300px]" : "w-[400px]"
                  }`}
                >
                  <div
                    onClick={() => {
                      googleSignin()
                    }}
                    style={{
                      alignItems: "center",
                    }}
                    className="flex align-center cursor-pointer gap-3.5 justify-between px-7 py-3.5 bg-indigo-500 rounded-[30px] max-md:px-5"
                  >
                    <img src={GooglePhoto}></img>
                    <div>Login with Google</div>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/4df99f6de50777597ab3bc6f1fb4013a3f5b61c903e49d8ea6b771b3da6845df?"
                      className="my-auto w-1.5 aspect-[0.55] stroke-[1.667px] stroke-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
