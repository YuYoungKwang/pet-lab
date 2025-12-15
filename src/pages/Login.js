import { useState } from "react";
import  '../styles/Login.css';


function Login() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [saveId, setSaveId] = useState(false);

    const handleLogin = () => {
        console.log('로그인 시도 :', { id, password, saveId });

    }
    return (
        <div className="bg">
            <div className="board">
                <h3>로그인</h3>
                <input type="text" placeholder="로그인" value={id} onChange={(e) => setId(e.target.value)} />
                <p><input type="passoword" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} /></p>
                <div className="options">
                    <label>
                        <input type="checkbox" checked={saveId} onChange={() => setSaveId(!saveId)} />아이디 저장
                    </label>
                    <a href="/find">아이디/비밀번호 찾기</a>
                    <p><button onClick={handleLogin}>로그인</button>
                        <button className="signup">회원가입</button></p>
                </div>
            </div>
        </div>

    )

}

export default Login;