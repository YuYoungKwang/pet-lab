import '../../styles/Header.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

function Header() {
    const logoPath = "/images/logo_petLab.png";
    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState(null);

    useEffect(() => {
        const user = localStorage.getItem("loginUser");
        if (user) {
            setLoginUser(JSON.parse(user));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("loginUser");
        setLoginUser(null);
        navigate("/login");
    };

    return (
        <header className="header-container">
            <div className="header-logo">
                <img
                    src={logoPath}
                    alt="펫랩 로고"
                    className="logo-img"
                    onClick={() => navigate('/')}
                />
            </div>

            <nav className="header-right">
                <span className="header-menu" onClick={() => navigate('/funding')}>
                    펀딩시작하기
                </span>
                <span className="header-menu" onClick={() => navigate('/mypage')}>마이페이지</span>

                {loginUser ? (
                    /* ✅ 로그인 상태 */
                    <>
                        <span className="header-menu">
                            {loginUser.id} 님
                        </span>
                        <span
                            className="header-menu logout"
                            onClick={handleLogout}
                        >
                            로그아웃
                        </span>
                    </>
                ) : (
                    /* ❌ 비로그인 상태 */
                    <>
                        <span
                            className="header-menu"
                            onClick={() => navigate('/login')}
                        >
                            로그인
                        </span>
                        <span
                            className="header-menu"
                            onClick={() => navigate('/register')}
                        >
                            회원가입
                        </span>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Header;
