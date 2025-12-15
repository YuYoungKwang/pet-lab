import { Routes, Route} from 'react-router';
import './App.css';
import Header from './components/common/Header';
function App() {
  return (
    <div>
      <Header/>
      <Routes>
        {/* <Route path="/" element={<MainPage/>}/>
        <Route path="/funding" element={<MainPage/>}/>
        <Route path="/mypage" element={<MainPage/>}/>
        <Route path="/login" element={<MainPage/>}/>
        <Route path="/register" element={<Register/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
