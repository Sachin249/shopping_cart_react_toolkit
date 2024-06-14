import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './pages/Cart';
function App() {

  return (
    <>
    <ToastContainer />
    <Navbar/>
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/cart' element={<Cart />} />
    </Routes>
    </>
  )
}

export default App
