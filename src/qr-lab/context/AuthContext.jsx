import { createContext, useContext, useEffect, useState } from "react"
import { auth } from "../firebase/firebase"

import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth"
import { useAlert } from "react-alert"

const UserAuthContext = createContext()

export const UserAuthContextProvider = ({ children }) => {
  var db = getFirestore()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")))
  const alert = useAlert()
  const [timeActive, setTimeActive] = useState(false)
  const signUp = async (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        // Getting the user info and storing isValidTimestamp,
        var user = result.user
        const userDocRef = doc(db, "Users", user.uid)
        const userDocSnapshot = await getDoc(userDocRef)
        if (!userDocSnapshot.exists()) {
          const userDataToStore = {}
          Object.keys(user).forEach((key) => {
            if (typeof user[key] !== "object") {
              userDataToStore[key] = user[key]
            }
          })
          await setDoc(userDocRef, userDataToStore)
          alert.success("Account Created. Please Sign In")
          return true
        } else {
          alert.error("User Already Exists")
          return false
        }
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        alert.error(errorMessage)
      })
  }
  const emailVerification = () => {
    return sendEmailVerification(auth.currentUser)
  }
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }
  const logOut = () => {
    localStorage.setItem("user", null)
    setUser(null)
    return signOut(auth)
  }
  const googleSignin = async () => {
    const googleAuthProvider = new GoogleAuthProvider()
    return signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        var user = result.user
        const userDocRef = doc(db, "Users", user.uid)
        const userDocSnapshot = await getDoc(userDocRef)
        if (!userDocSnapshot.exists()) {
          const userDataToStore = {}
          Object.keys(user).forEach((key) => {
            if (typeof user[key] !== "object") {
              userDataToStore[key] = user[key]
            }
          })
          await setDoc(userDocRef, userDataToStore)
          setUser(user)
        } else if (userDocSnapshot.exists()) {
          setUser(user)
        }
      })
      .catch((error) => {
        console.log("error=" + error)
      })
  }
  const signIn = async (email, password) => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          const userData = userCredential.user
          const userDocRef = doc(db, "Users", userData.uid)
          const userDocSnapshot = await getDoc(userDocRef)
          if (userDocSnapshot.exists()) {
            setUser(userData)
          }
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          alert.error(errorMessage)
        })
    } catch (err) {
      console.error(err)
    }
  }
  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User we are getting is : ", user)
    })
    return () => {
      unsubscribe()
    }
  })
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])
  return (
    <UserAuthContext.Provider
      value={{
        user,
        signUp,
        logIn,
        emailVerification,
        signIn,
        logOut,
        timeActive,
        setTimeActive,
        googleSignin,
        forgotPassword,
      }}
    >
      {children}
    </UserAuthContext.Provider>
  )
}

//custome useContext hook
export const useUserAuthContext = () => {
  return useContext(UserAuthContext)
}
