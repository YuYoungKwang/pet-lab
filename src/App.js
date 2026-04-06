import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import fundingList from './data/fundingList';
import postList from './data/postList';
import Board from './pages/Board';
import CartPage from './pages/CartPage';
import CategoryPage from './pages/CategoryPage';
import FavoritePage from './pages/FavoritePage';
import FAQ from './pages/FAQ';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import MyPage from './pages/MyPage';
import OrderPage from './pages/OrderPage';
import Profile from './pages/ProFile';
import Register from './pages/Register';
import SearchResultPage from './pages/SearchResultPage';
import SignUpPage from './pages/SignUpPage';
import CommunityMain from './pages/community/CommunityMain';
import PostDetailPage from './pages/community/PostDetailPage';
import PostEditPage from './pages/community/PostEditPage';
import PostListPage from './pages/community/PostListPage';
import PostWritePage from './pages/community/PostWritePage';
import FundingDetail from './pages/funding/FundingDetail';
import FundingEdit from './pages/funding/FundingEdit';
import FundingRegister from './pages/funding/FundingRegister';

const FUNDING_STORAGE_KEY = 'fundingList';
const POST_STORAGE_KEY = '寃뚯떆湲 ?뺣낫';
const DATA_SEED_VERSION_KEY = 'petLabDataSeedVersion';
const DATA_SEED_VERSION = '2026-04-06';

function buildSeedPosts() {
  const repeatedPosts = [];

  for (let i = 0; i < postList.length; i++) {
    for (let j = 0; j < 7; j++) {
      repeatedPosts.push({
        ...postList[i],
        fundingId: (j % 7) + 1,
      });
    }
  }

  return repeatedPosts;
}

function syncSeedData() {
  localStorage.setItem(FUNDING_STORAGE_KEY, JSON.stringify(fundingList));
  localStorage.setItem(POST_STORAGE_KEY, JSON.stringify(buildSeedPosts()));
  localStorage.setItem(DATA_SEED_VERSION_KEY, DATA_SEED_VERSION);
}

function App() {
  const [loginUser, setLoginUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('loginUser');

    if (storedUser) {
      setLoginUser(JSON.parse(storedUser));
    }

    const hasFundingSeed = localStorage.getItem(FUNDING_STORAGE_KEY);
    const hasPostSeed = localStorage.getItem(POST_STORAGE_KEY);
    const currentSeedVersion = localStorage.getItem(DATA_SEED_VERSION_KEY);

    if (!hasFundingSeed || !hasPostSeed || currentSeedVersion !== DATA_SEED_VERSION) {
      syncSeedData();
    }
  }, []);

  return (
    <div>
      <Header loginUser={loginUser} setLoginUser={setLoginUser} />
      <Routes>
        <Route path="/" element={<MainPage loginUser={loginUser} />} />
        <Route path="/funding" element={<FundingRegister />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResultPage loginUser={loginUser} />} />
        <Route path="/category/:categoryName" element={<CategoryPage loginUser={loginUser} />} />
        <Route path="/login" element={<Login setLoginUser={setLoginUser} />} />
        <Route path="/fundingDetail/:fundingId/community" element={<CommunityMain />}>
          <Route index element={<Navigate to="board/free" replace />} />
          <Route path="board/:category" element={<PostListPage />} />
          <Route path="write" element={<PostWritePage />} />
          <Route path="post/:id" element={<PostDetailPage />} />
          <Route path="board/:category/edit/:id" element={<PostEditPage />} />
        </Route>
        <Route path="/fundingDetail/:fundingId" element={<FundingDetail loginUser={loginUser} />} />
        <Route path="/fundingEdit/:fundingId" element={<FundingEdit loginUser={loginUser} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/mypage" element={<MyPage loginUser={loginUser} />} />
        <Route path="/profile" element={<Profile loginUser={loginUser} />} />
        <Route path="/board" element={<Board />} />
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
