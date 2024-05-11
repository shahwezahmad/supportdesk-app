
import axios from 'axios'

const API_URL = 'https://supportdesk-app-c1ny.onrender.com/api/users'

const register = async (userData) => {
    const  response = await axios.post(API_URL, userData)
    console.log(userData);
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const login = async (userData) => {
    const response = await axios.post(`${API_URL}/login`,userData ,{headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
    }})
    if(response.data) {
        localStorage.setItem('user',JSON.stringify(response.data))

    }
    return response.data
}

const logout = () => localStorage.removeItem('user')

 const authService = {register,login, logout}


 export default authService