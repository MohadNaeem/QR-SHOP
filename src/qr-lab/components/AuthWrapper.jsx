import { useNavigate } from "react-router-dom"
import { useUserAuthContext } from "../context/AuthContext"
import { useEffect } from "react"

export const AuthWrapper = (props) => {
  const { user } = useUserAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user?.uid) {
      navigate("/login")
    }
  }, [user])

  return <>{props.children}</>
}
