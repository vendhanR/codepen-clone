import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './container'
import { auth, db } from './config/firebase.config'
import { doc, setDoc } from 'firebase/firestore';
import { Spinner } from './component'

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  useEffect(() => {
    // get auth information, onAuthStateChanged -> automatically driger once google ,github,email&pass auth created 
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]);
      } else {
        navigate('/name/auth', { replace: true })
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })
    return () => unsubscribe();
  }, []);

  return (
    isLoading ?
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <Spinner />
      </div>
      : <div className='vh-100 w-100 d-flex justify-content-start align-items-start  overflow-hidden'>
        <Routes>
          <Route path='/home/*' element={<Home />} />
          <Route path='*' element={<Navigate to={'/home'} />} />
        </Routes>
      </div>

  )
}

export default App