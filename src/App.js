import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { Home } from './container'

const App = () => {
  return (
    <div className='vh-100 w-100 d-flex justify-content-start align-items-start  overflow-hidden'>        
        <Routes>
            <Route path='/home/*' element={<Home/>} />
            <Route path='*' element={<Navigate to={'/home'} />}/>
            
        </Routes>
    </div>
  )
}

export default App