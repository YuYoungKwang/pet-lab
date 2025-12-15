import '../../styles/Header.css';
import { Routes, Route, Link, useNavigate } from 'react-router';

function Header() {
    const logoPath = "/images/logo_petLab.png";
    const navigte = useNavigate();
    return (
        <header className="header-container">
            <div className="header-logo">
                <img src={logoPath} alt="펫랩 로고" className="logo-img" onClick={()=>{navigte('/')}}/>
            </div>
            <nav className="header-right">
                <span className="header-menu" onClick={() => {navigte('/funding')}}>펀딩시작하기</span>
                <span className="header-menu" onClick={() => {navigte('/mypage')}}>마이페이지</span>
                <span className="header-menu" onClick={() => {navigte('/login')}}>로그인</span>
                <span className="header-menu" onClick={() => {navigte('/register')}}>회원가입</span>
            </nav>
        </header>
    );
}

export default Header;
