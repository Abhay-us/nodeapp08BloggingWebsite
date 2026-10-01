import './App.css'
import { Routes, Route } from 'react-router-dom';
import UserTable from './components/UserTable';
import Login from './components/Auth/login/Login';
import ForgotPassword from './components/Auth/forgotPassword/ForgotPassword';
import ProtectedRoutes from './components/Auth/ProtectedRoutes';
import PostTable from './components/PostTable';
import PostCard from './components/PostCard';
function App() {

  return (
    <>
      <div className="container">
        <h1 className='text-center'>Blogging Website</h1>
      </div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />

        <Route element={<ProtectedRoutes />}>
          <Route path='/' element={<UserTable />} />
          <Route path='/posts' element={<PostTable />} />
          <Route path='/postcards' element={<PostCard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
