import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import "../styles/Login.css";

function Login() {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [saveId, setSaveId] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        // 아이디 저장
        const savedId = localStorage.getItem("savedId");
        if (savedId) {
            setId(savedId);
            setSaveId(true);
        }

        // 자동 로그인
        const loginUser = localStorage.getItem("loginUser");
        if (loginUser) {
            navigate("/mypage", { replace: true });
        }
    }, [navigate]); // ESlint 경고 방지


    const handleLogin = (e) => {
        e.preventDefault();

        const inputId = id.trim();

        if (!inputId || !password) {
            alert("아이디와 비밀번호를 입력해주세요.");
            return;
        }

        const storedUsers = localStorage.getItem("회원정보");
        if (!storedUsers) {
            alert("가입된 회원이 없습니다.");
            return;
        }

        const parsed = JSON.parse(storedUsers);
        const users = Array.isArray(parsed) ? parsed : [];

        const user = users.find(
            (u) => u.id === inputId && u.password === password
        );

        if (!user) {
            alert("아이디 또는 비밀번호가 올바르지 않습니다.");
            setPassword("");
            return;
        }

        if (saveId) {
            localStorage.setItem("savedId", inputId);
        } else {
            localStorage.removeItem("savedId");
        }

        localStorage.setItem("loginUser", JSON.stringify(user));

        alert("로그인 성공!");
        navigate("/mypage");
    };

    const handleFindClick = (e) => {
        e.preventDefault();
        console.log("아이디/비밀번호 찾기 클릭됨");
    };

    return (
        <div className="bg">
            <div className="board">
                <h3>로그인</h3>

                <form onSubmit={handleLogin}>
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
                            <button type="submit">로그인</button>
                            <button
                                type="button"
                                className="signup"
                                onClick={() => navigate("/register")}
                            >
                                회원가입
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
