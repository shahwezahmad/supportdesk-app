import {useEffect, useState} from 'react'
import {FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {register,reset} from '../features/auth/authSlice'
import {useNavigate} from 'react-router-dom'
import Spinner from '../components/Spinner'

const Register = () => {
    const [formData, setFormData] = useState({
        name:'',
        email:'',
        password:'',
        password2:'',
    })
    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message} = useSelector((state)=> state.auth )
    const {name, email, password, password2}  = formData
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

        if(password !== password2){
            toast.error('Password do not match')
        }else {
            const userData = {name, email, password}
            dispatch(register(userData))
        }
    }

    if(isLoading){
        return <Spinner />
    }

    return (
        <>
        <section className='heading'>
        <h1> <FaUser/> Register </h1>
        <p>Please create an account</p>
        </section>
        <section className='form' onSubmit={onSubmit}> 
            <form>
                <div className='form-group'>
                <input type='text' id='name' name='name' className='form-control' value={name} onChange={onChange} placeholder='Enter your name' required />
                </div>
                <div className='form-group'>
                <input type='email' id='email' name='email' className='form-control' value={email} onChange={onChange} placeholder='Enter your email' required />
                </div>
                <div className='form-group'>
                <input type='password' id='password' name='password' className='form-control' value={password} onChange={onChange} placeholder='Enter password' required />
                </div>
                <div className='form-group'>
                <input type='password' id='password2' name='password2' className='form-control' value={password2} onChange={onChange} placeholder='Confrim password' required />
                </div>
                <div className='form-group'>
                    <button className='btn btn-block'>Submit</button>
                </div>

            </form>

        </section>
        </>
    )
}

export default Register