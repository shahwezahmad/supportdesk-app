import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Login  from './pages/Login';
import Register from './pages/Register';
import Header from './components/Header';
import NewTicket from './pages/NewTicket';
import Ticket from './pages/Ticket'
import PrivateRoute from './components/PrivateRoute';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Tickets from './pages/Tickets';
  

function App() {
  return (
    <>  
      <Router>
      <div className='container'>
      <Header />
      <Routes>
        <Route path='/' element = {<Home />}  />
        <Route path='/register' element = {<Register />} />
        <Route path='/login' element = {<Login />} />
        <Route path='/new-ticket' element = {<PrivateRoute />}>
        <Route path='/new-ticket' element = {<NewTicket />} />
        </Route>
        <Route path='/tickets'  element = {<PrivateRoute />}  >
          <Route path='/tickets' element = {<Tickets />} />
        </Route>
        <Route path='/ticket/:ticketId' element = {<PrivateRoute />}>
        <Route  path='/ticket/:ticketId' element = {<Ticket />} />
        </Route>
      </Routes>
      </div>
    </Router>
      <ToastContainer />
      </>

  );
}

export default App;
