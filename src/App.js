import { Routes, Route} from 'react-router';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import { useState, useEffect } from 'react';

function App() {
  const [loginUser, setLoginUser] = useState(null);

    // 새로고침 시 로그인 유지
    useEffect(() => {
        const storedUser = localStorage.getItem("loginUser");
        if (storedUser) {
            setLoginUser(JSON.parse(storedUser));
        }
    }, []);

  return (
    <div>
      <Header/>
      <Routes>
        {/* <Route path="/" element={<MainPage/>}/>
        <Route path="/funding" element={<MainPage/>}/>
        <Route path="/mypage" element={<MainPage/>}/>
        <Route path="/login" element={<MainPage/>}/>
        <Route path="/register" element={<Register/>}/> */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage loginUser={loginUser} />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
