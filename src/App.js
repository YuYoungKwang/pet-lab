import { Routes, Route } from 'react-router';
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
import fundingList from './data/fundingList';
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/mypage';
import { useState, useEffect } from 'react';

function App() {
  const [loginUser, setLoginUser] = useState(null);

  // 새로고침 시 로그인 유지
  useEffect(() => {
    const stored = localStorage.getItem("fundingList");

    if (!stored) {
      localStorage.setItem(
        "fundingList",
        JSON.stringify(fundingList)
      );
    }

    const storedUser = localStorage.getItem("loginUser");
    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/funding" element={<FundingRegister />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fundingDetail/:fundingId" element={<FundingDetail />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage loginUser={loginUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
