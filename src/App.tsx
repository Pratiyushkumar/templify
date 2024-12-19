import { Routes, Route } from 'react-router';
import Home from './page/Home';
import SignIn from './page/SignIn';
import SignUp from './page/SignUp';
import Hero from './page/Hero';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/home" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;