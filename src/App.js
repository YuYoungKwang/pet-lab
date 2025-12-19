import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import FundingDetail from './pages/funding/FundingDetail';
import FundingRegister from './pages/funding/FundingRegister';
import CategoryPage from "./pages/CategoryPage";
import SearchResultPage from "./pages/SearchResultPage";
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import fundingList from './data/fundingList';
import { useState, useEffect } from 'react';

function App() {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    // 로그인 유지
    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) setLoginUser(JSON.parse(storedUser));

    // 펀딩 리스트 초기화
    if (!localStorage.getItem("fundingList")) {
      localStorage.setItem("fundingList", JSON.stringify(fundingList));
    }
  }, []);

  return (
    <div>
      <Header loginUser={loginUser} setLoginUser={setLoginUser} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/funding" element={<FundingRegister loginUser={loginUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/fundingDetail/:fundingId" element={<FundingDetail />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage loginUser={loginUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
