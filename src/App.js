import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import MainPage from './pages/MainPage';
import FundingDetail from './pages/funding/FundingDetail';
import FundingRegister from './pages/funding/FundingRegister';
import FundingEdit from './pages/funding/FundingEdit';
import CategoryPage from "./pages/CategoryPage";
import SearchResultPage from "./pages/SearchResultPage";
import SignUpPage from './pages/SignUpPage';
import MyPage from './pages/MyPage';
import fundingList from './data/fundingList';
import { useState, useEffect } from 'react';
import Profile from './pages/ProFile';
import CommunityMain from './pages/community/CommunityMain';
import PostDetailPage from './pages/community/PostDetailPage';
import PostListPage from './pages/community/PostListPage';
import PostWritePage from './pages/community/PostWritePage';
import CartPage from './pages/CartPage';
import Board from './pages/Board';
import FAQ from './pages/FAQ';
import OrderPage from './pages/OrderPage';
import FavoritePage from './pages/FavoritePage';
import PostEditPage from './pages/community/PostEditPage';

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
        <Route path="/" element={<MainPage loginUser={loginUser}/>} />
        <Route path="/funding" element={<FundingRegister/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResultPage loginUser={loginUser}/>} />
        <Route path="/category/:categoryName" element={<CategoryPage loginUser={loginUser}/>} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/fundingDetail/:fundingId/community" element={<CommunityMain />}>
          <Route index element={<Navigate to="board/free" replace />} />
          <Route path="board/:category" element={<PostListPage />} />
          <Route path="write" element={<PostWritePage />} />
          <Route path="post/:id" element={<PostDetailPage />} />
          <Route path="board/:category/edit/:id" element={<PostEditPage />} />
        </Route>
        <Route path="/fundingDetail/:fundingId" element={<FundingDetail loginUser={loginUser}/>} />
        <Route path="/fundingEdit/:fundingId" element={<FundingEdit loginUser={loginUser}/>} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage loginUser={loginUser} />} />
        <Route path="/profile" element={<Profile loginUser={loginUser}/>} />
        <Route path="/board" element={<Board loginUser={loginUser}/>} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cart" element={<CartPage loginUser={loginUser} />} />
        <Route path="/order" element={<OrderPage loginUser={loginUser} />} />
        <Route path="/wishlist" element={<FavoritePage loginUser={loginUser} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

