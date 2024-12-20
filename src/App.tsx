import { Routes, Route } from 'react-router';
import PrivateRoutes from './utils/PrivateRoutes';
import Home from './page/Home';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Hero from './page/Hero';
import { AuthProvider } from './context/AuthContext';
function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route element={<PrivateRoutes />}>
          <Route path='/home' element={<Home />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
