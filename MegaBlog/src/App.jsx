import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {login, logout} from './store/authSlice'
import { Outlet } from 'react-router-dom'

import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  return !loading? (
    <div className='min-h-screen flex flex-wrep content-between bg-gray-800'>
      <div className='w-full black '>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div> 
    </div>
  ) : null
}

export default App
