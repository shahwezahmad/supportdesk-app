import {useState,useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {login,reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'
const Login = () => {
    const [formData, setFormData] = useState({
        email:'',
        password:'',
    })
    const {email, password}  = formData
    
    const {user, isError, isSuccess, message, isLoading }  = useSelector((state)=> state.auth )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState)=> ({
            ...prevState, [e.target.name]:e.target.value
        }))
    }

    useEffect(()=> {
        if(isError){
            toast.error(message)
        }
        if(user || isSuccess){
            dispatch(reset( ))
            navigate('/')
        }

    },[user, isLoading, isError, isSuccess, message, dispatch,navigate ])

    const onSubmit = (e) => {
        e.preventDefault()

        if(!email || !password){
            toast.error('Fill email')
        }else {
            const userData = {email,password}
            dispatch(login(userData))

        }
    }
    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className='heading'>
        <h1> <FaSignInAlt /> Login </h1>
        <p>Please login to get support</p>
        </section>
        <section className='form' onSubmit={onSubmit}> 
            <form>
                
                <div className='form-group'>
                <input type='email' id='email' name='email' className='form-control' value={email} onChange={onChange} placeholder='Enter your email' required />
                </div>
                <div className='form-group'>
                <input type='password' id='password' name='password' className='form-control' value={password} onChange={onChange} placeholder='Enter password' required />
                </div>
                
                <div className='form-group'>
                    <button className='btn btn-block'>Login</button>
                </div>

            </form>

        </section>
        </>
    )
}

export default Login