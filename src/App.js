import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './container'
import { auth, db } from './config/firebase.config'
import { collection, doc, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { Spinner } from './component'
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/userSlice';
import { NewProject } from './component';
import { setProjects } from './store/slices/projectSlice';

const App = () => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    // get auth information, onAuthStateChanged -> automatically driger once google ,github,email&pass auth created 
    const unsubscribe = auth.onAuthStateChanged(userCred => {
      if (userCred) {
        console.log(userCred?.providerData[0]);
        // every time refresing or reloding it will not create  or override new record unless the id is already inside the document  
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {
          dispatch(setUser(userCred?.providerData[0]))
          navigate('/home/projects', { replace: true })
        }

        )
      } else {
        navigate('/home/auth', { replace: true })
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    })
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const projectQuery = query(
      collection(db, 'Projects'),
      orderBy('id', 'desc')
    )

    const unsubscribe = onSnapshot(projectQuery, (querySanps) => {
      const projectList = querySanps.docs.map(doc => doc.data());
      dispatch(setProjects(projectList))
      
    })

    return unsubscribe;
  }, [])

  return (
    isLoading ?
      <div className='vh-100 d-flex justify-content-center align-items-center'>
        <Spinner />
      </div>
      : <div className='vh-100 w-100 d-flex justify-content-start align-items-start  overflow-hidden'>
        <Routes>
          <Route path='/home/*' element={<Home />} />
          <Route path='/newProject' element={<NewProject />} />
          <Route path='*' element={<Navigate to={'/home'} />} />
        </Routes>
      </div>

  )
}

export default App