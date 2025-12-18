import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/Login.css";

function Login({ setLoginUser }) {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [saveId, setSaveId] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const savedId = localStorage.getItem("savedId");
        if (savedId) {
            setId(savedId);
            setSaveId(true);
        }

        const loginUser = localStorage.getItem("loginUser");
        if (loginUser) navigate("/mypage", { replace: true });
    }, [navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (!id.trim() || !password) return alert("아이디와 비밀번호를 입력해주세요.");

        const storedUsers = localStorage.getItem("회원정보");
        if (!storedUsers) return alert("가입된 회원이 없습니다.");

        const users = JSON.parse(storedUsers);
        const user = users.find(u => u.id === id && u.password === password);
        if (!user) {
            setPassword("");
            return alert("아이디 또는 비밀번호가 올바르지 않습니다.");
        }

        saveId ? localStorage.setItem("savedId", id) : localStorage.removeItem("savedId");

        localStorage.setItem("loginUser", JSON.stringify(user));
        setLoginUser(user); 
        alert("로그인 성공!");
        navigate("/mypage");
    };

    return (
        <div className="bg">
            <div className="board">
                <h3>로그인</h3>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="아이디" value={id} onChange={e => setId(e.target.value)} />
                    <p>
                        <input type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} />
                    </p>
                    <div className="options">
                        <div className="login-func">
                            <label>
                                <input type="checkbox" checked={saveId} onChange={() => setSaveId(!saveId)} /> 아이디 저장
                            </label>
                        </div>
                        <p>
                            <button type="submit">로그인</button>
                            <button type="button" className="signup" onClick={() => navigate("/register")}>회원가입</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
