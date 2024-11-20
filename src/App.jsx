import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import { signOut } from 'firebase/auth'
import { auth } from './firebase-config'



const App = () => {
  
  // const [isAuth, setIsAuth] = useState(false)
  const [isAuth , setIsAuth] = useState(localStorage.getItem('isAuth'))


  const signUserOut = () =>{
    signOut(auth).then(() =>{
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login';
    })
  }



  return (
    <>
     <Router>
      <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">User</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 ">
          <li><Link  to={'/'}>Home</Link></li>
          
          <li>{!isAuth ? <Link to={'/login'}>Login</Link> :
              (
                <>
                <button><Link to={'/dashboard'}>Dashboard</Link></button>
                <button className='btn btn-ghost' onClick={signUserOut}>Logout</button>
                </>
              )}</li>
        </ul>
      </div>
    </div>
  

      <div className='container mt-5'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/dashboard' element={<Dashboard isAuth={isAuth}/>}/>
          <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>

        </Routes>
      </div>


     </Router>



    </>
  )
}

export default App