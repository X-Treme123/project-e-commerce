import { useEffect, useState } from "react"
import { getUser } from "../Services/auth.service"


const useLogin = () => {
    const [username, setUsername] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            setUsername(getUser(token))
        } else {
            window.location.href = "/login"
        }
    }, [])
    return username
}

export default useLogin