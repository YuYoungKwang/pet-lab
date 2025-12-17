import { Navigate } from "react-router-dom";

function MyPage({ loginUser }) {
    if (!loginUser) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div>
            <h2>{loginUser.name}님 환영합니다</h2>
            <p>아이디: {loginUser.id}</p>
            <p>이메일: {loginUser.email}</p>
        </div>
    );
}

export default MyPage;
