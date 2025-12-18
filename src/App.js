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
import { useEffect } from 'react';
function App() {

  useEffect(() => {
    const stored = localStorage.getItem("fundingList");

    if (!stored) {
      localStorage.setItem(
        "fundingList",
        JSON.stringify(fundingList)
      );
    }
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        {/* <Route path="/" element={<MainPage/>}/>
        <Route path="/fundingregister" element={<FundingRegister/>}/>
        <Route path="/mypage" element={<MainPage/>}/>
        <Route path="/login" element={<MainPage/>}/>
        <Route path="/register" element={<Register/>}/> */}
        <Route path="/" element={<MainPage />} />
        <Route path="/funding" element={<FundingRegister />} />
        <Route path="/register" element={<Register />} />
        <Route path="/search" element={<SearchResultPage />} />
        <Route path="/category/:categoryName" element={<CategoryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fundingDetail/:fundingId" element={<FundingDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
