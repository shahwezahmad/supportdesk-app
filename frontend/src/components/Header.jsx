import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'

const Header = () => {
    const {user} = useSelector((state)=> state.auth )
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <header className='header'>
            <div className='logo'>
                <Link to = '/'>Support Desk</Link>
            </div>
            <ul>
                {user ? (
                    <li>
                        <button onClick={onLogout} className='btn btn-block'> <FaSignOutAlt />logout </button>
                    </li>
                ) : (
                    <>
                    <li><Link to='/login'><FaSignInAlt/>Login</Link> </li>
                    <li><Link to='/register'><FaUser/>Register</Link> </li>
                    </>
                )}
                </ul>

        </header>
    )
}

export default Header