import { useState } from 'react'
import Login from './auth/Login'
import Provider from './Provider'
import { BrowserRouter,Routes, Route} from 'react-router-dom';

function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/checkUsers' element={<Provider/>}/>
        </Routes>
      </BrowserRouter>
    
    </>
  )
}

export default App
