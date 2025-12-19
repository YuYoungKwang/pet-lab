import { useState } from "react";
import { useNavigate } from "react-router";
import '../styles/Register.css';
import Purchase from "./modal/Purchase";
import Finance from "./modal/Finance";
import Thirdparty from "./modal/Thirdparty";
import Collection from "./modal/Collection";

function Register() {
    const [agreements, setAgreements] = useState({
        purchase: false,
        finance: false,
        collection: false,
        thirdparty: false,
        benefitOptin: false,
    });
    
    let navigate = useNavigate();
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    const requiredKeys = ["purchase", "finance", "collection", "thirdparty"];
    const allChecked = Object.values(agreements).every(Boolean);

    const handleChange = (key) => {
        setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleAllChange = () => {
        const newValue = !allChecked;
        setAgreements({
            purchase: newValue,
            finance: newValue,
            collection: newValue,
            thirdparty: newValue,
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
            <div className="register-header-section">
                <img src="/images/register.img.png" alt="icon" className="top-icon" />
                <h1 className="main-title">회원가입하신 후 다양한 혜택을 만나보세요!</h1>
                <p className="sub-description">회원가입 약관을 자세히 읽어 보시고 동의하시면 회원가입을 진행해주세요.</p>
            </div>

            <div className="steps-wrapper">
                <div className="steps-right-box">
                    <span className="steps-right">● 약관동의 &gt; 정보입력 &gt; 가입완료</span>
                </div>
            </div>

            <div className="agreement-box">
                <p className="agreement-start-text">* 약관에 동의해 주세요.</p>
                
                <div className="all-check-box">
                    <label className="agreement-label">
                        <input type="checkbox" checked={allChecked} onChange={handleAllChange} />
                        <span className="agreement-text">모두동의</span>
                    </label>
                </div>

                {/* 약관 리스트 */}
                <div className="agreement-list">
                    <div className="agreement-item">
                        <label className="agreement-label">
                            <input type="checkbox" checked={agreements.purchase} onChange={() => handleChange("purchase")} />
                            <span className="agreement-text">구매회원 이용약관 <span className="required-tag">(필수)</span></span>
                        </label>
                        <button type="button" className="view-btn" onClick={() => openModal('Purchase')}>약관보기</button>
                    </div>

                    <div className="agreement-item">
                        <label className="agreement-label">
                            <input type="checkbox" checked={agreements.finance} onChange={() => handleChange("finance")} />
                            <span className="agreement-text">전자금융 서비스 이용약관 <span className="required-text">(필수)</span></span>
                        </label>
                        <button type="button" className="view-btn" onClick={() => openModal('Finance')}>약관보기</button>
                    </div>

                    <div className="agreement-item">
                        <label className="agreement-label">
                            <input type="checkbox" checked={agreements.collection} onChange={() => handleChange("collection")} />
                            <span className="agreement-text">개인정보 수집 및 이용 <span className="required-text">(필수)</span></span>
                        </label>
                        <button type="button" className="view-btn" onClick={() => openModal('Collection')}>내용보기</button>
                    </div>

                    <div className="agreement-item">
                        <label className="agreement-label">
                            <input type="checkbox" checked={agreements.thirdparty} onChange={() => handleChange("thirdparty")} />
                            <span className="agreement-text">개인정보 3자 제공 동의 <span className="required-text">(필수)</span></span>
                        </label>
                        <button type="button" className="view-btn" onClick={() => openModal('Thirdparty')}>내용보기</button>
                    </div>

                    <div className="agreement-item last-item">
                        <label className="agreement-label">
                            <input type="checkbox" checked={agreements.benefitOptin} onChange={() => handleChange("benefitOptin")} />
                            <span className="agreement-text">혜택 알림 이메일, 문자 <span className="optional-tag">(선택)</span></span>
                        </label>
                    </div>
                </div>

                <div className="info-box">
                    <p className="info-text">※ 필수 수집 개인정보는 서비스 이용에 필요한 최소한의 정보이며, 동의를 해주셔야만 서비스를 이용하실 수 있습니다.</p>
                    <p className="info-text">※ 선택적 수집 항목에 대한 동의 없이도 회원가입, 상품구매 등 기본 서비스 이용은 가능합니다. 단, 일부 서비스 이용은 제한될 수 있습니다.</p>
                </div>

                <button onClick={handleSubmit} className="submit-button">동의하고 회원가입</button>
            </div>

            {/* 모달: 닫기 버튼을 상단 우측에 완전히 독립시켜 정렬 */}
            {modalContent && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content-wrapper" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">상세 내용</h2>
                            <button className="modal-close-x" onClick={closeModal}>✕</button>
                        </div>
                        <div className="modal-body">
                            {modalContent === 'Purchase' && <Purchase />}
                            {modalContent === 'Finance' && <Finance />}
                            {modalContent === 'Collection' && <Collection />}
                            {modalContent === 'Thirdparty' && <Thirdparty />}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Register;