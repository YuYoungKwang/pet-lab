import { useState } from "react";
import '../styles/Login.css';
import { useNavigate } from "react-router";


function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [saveId, setSaveId] = useState(false);

    const handleLogin = () => {
        console.log('로그인 시도 :', { id, password, saveId });
    };

    const handleFindClick = (e) => {
        e.preventDefault();
        console.log("아이디/비밀번호 찾기 클릭됨");
    };

    const navigate = useNavigate();
    return (
        <div className="bg">
            <div className="board">
                <h3>로그인</h3>
                <input
                    type="text"
                    placeholder="아이디"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <p>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>
                <div className="options">
                    <div className="login-func">
                        <label>
                            <input
                                type="checkbox"
                                checked={saveId}
                                onChange={() => setSaveId(!saveId)}
                            />
                            &nbsp; 아이디 저장
                        </label>

                        <a href="#" onClick={handleFindClick}>
                            아이디/비밀번호 찾기
                        </a>
                    </div>
                    <p>
                        <button onClick={handleLogin}>로그인</button>
                        <button className="signup" onClick={()=>{navigate('/register')}}>회원가입</button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;