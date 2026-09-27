import './App.css'
import { Routes, Route } from 'react-router-dom';
import UserTable from './components/UserTable';
import Login from './components/Auth/login/Login';
import ForgotPassword from './components/Auth/forgotPassword/ForgotPassword';
function App() {

  return (
    <>
      <div className="container">
        <h1 className='text-center'>Blogging Website</h1>
      </div>
      <Routes>
        <Route path='/' element={<UserTable />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
      </Routes>
    </>
  )
}

export default App
