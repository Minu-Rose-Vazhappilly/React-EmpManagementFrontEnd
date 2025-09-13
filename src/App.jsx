import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homee from './pages/Homee'
import Employee from './pages/Employee'

function App() {
  
  return (
    <>
    <h1 className='text-center'>Employee Management App</h1>
    <Routes>
      <Route path='/' element={<Homee/>}></Route>
      <Route path='/employee' element={<Employee/>}></Route>
    </Routes>
    </>
  )
}

export default App
