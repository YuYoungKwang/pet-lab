import { useState } from "react";
import { BrowserRouter, Navigate, Link ,Route ,Router, Routes, useNavigate } from "react-router";
// import '../styles/Register.css';
import purchase from "./modal/Purchase";

function Register() {
    const [agreements, setAgreements] = useState({
        purchase: false,
        finance: false,
        privacyCollect: false,
        privacyThird: false,
        benefitOptin: false,
    });
    let navigate = useNavigate();
    // 회원 약관 모달상태 관리
    const [showPurchaseModal, setshowPurchaseModal] = useState(false);
    const [showFinanaceModal,setshowFinanaceModal] = useState(false);
    // 필수약관 목록
    const requiredKeys = ["purchase", "finance", "privacyCollect", "privacyThird"];
    // 채크박스 true인지 확인
    const allChecked = Object.values(agreements).every(Boolean);

    const handleChange = (key) => {
        setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
    };
    // 모두동의 체크박스
    const handleAllChange = () => {
        const newValue = !allChecked;
        setAgreements({
            purchase: newValue,
            finance: newValue,
            privacyCollect: newValue,
            privacyThird: newValue,
            benefitOptin: newValue,
        });
    };

    const handleSubmit = () => {
        const missing = requiredKeys.filter((key) => !agreements[key]);
        if (missing.length > 0) {
            alert("필수 약관에 모두 동의해 주세요.");
            return;
        }
        alert("동의가 완료되었습니다. 다음 단계로 이동합니다.");
        navigate("/signup");
    };
    
    

    return (
        
        <div className="register-container">
            <h1>회원가입하신 후 다양한 혜택을 만나보세요!</h1>
            <p>회원가입 약관을 자세히 읽어 보시고 동의하시면 회원가입을 진행해주세요.</p>
            <p>약관동의 &gt; 정보입력 &gt; 가입완료</p>
            <hr />

            <div className="agreement-box">
                <h2>약관에 동의해 주세요.</h2>
                <hr />

                <div>
                    <label>
                        <input type="checkbox" checked={allChecked} onChange={handleAllChange} />
                        모두동의
                    </label>
                </div>
                <hr />

                <div>
                    <label>
                        <input type="checkbox" checked={agreements.purchase} onChange={() => handleChange("purchase")} />
                        구매회원 이용약관 (필수)
                    </label>
                    <button type="button" className="link-button">약관보기</button>        
                </div>
                <hr />
                <div>
                    <label>
                        <input type="checkbox" checked={agreements.finance} onChange={() => handleChange("finance")} />
                        전자금융 서비스 이용약관 (필수)
                    </label>
                    <button type="button" className="link-button">약관보기</button>
                </div>
                <hr />
                <div>
                    <label>
                        <input type="checkbox" checked={agreements.privacyCollect} onChange={() => handleChange("privacyCollect")} />
                        개인정보 수집 및 이용 (필수)
                    </label>
                    <button type="button" className="link-button">내용보기</button>
                </div>
                <hr />
                <div>
                    <label>
                        <input type="checkbox" checked={agreements.privacyThird} onChange={() => handleChange("privacyThird")} />
                        개인정보 3자 제공 동의 (필수)
                    </label>
                    <button type="button" className="link-button">내용보기</button>
                </div>
                <hr />
                <div>
                    <label>
                        <input type="checkbox" checked={agreements.benefitOptin} onChange={() => handleChange("benefitOptin")} />
                        혜택 알림 이메일, 문자 (선택)
                    </label>
                </div>
                <hr />
                <p className="info-text">
                    필수 수집 개인정보는 서비스 이용에 필요한 최소한의 정보이며, 동의를 해주셔야만 서비스를 이용하실 수 있습니다.
                </p>
                <p className="info-text">
                    선택적 수집 항목에 대한 동의 없이도 회원가입, 상품구매 등 기본 서비스 이용은 가능합니다. 단, 일부 서비스 이용은 제한될 수 있습니다.
                </p>
                
                <div>
                    <button onClick={handleSubmit} className="submit-button">
                        동의하고 회원가입
                    </button>


                    
                </div>
            </div>
        </div>
    );
}

export default Register;
