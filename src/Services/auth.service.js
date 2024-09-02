import axios from "axios"
import { jwtDecode } from "jwt-decode"

export const getUser = (token) => {
    const decoded = jwtDecode(token)
    return decoded.user
}
const login = (data, callback) => {
    axios.post("https://fakestoreapi.com/auth/login", data)
    .then((res) => {
        callback(true, res.data.token)
    }).catch((err) => {
        callback(false, err)
    }) 
};

export default login


