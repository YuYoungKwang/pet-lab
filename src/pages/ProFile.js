import React, { useState, useEffect } from 'react';
import '../styles/ProFile.css';

function Profile({ onBack, onSaveSuccess }) {
    const initialState = {
        id: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        addr1: '',
        addr2: '',
        addr3: '',
        phone1: '',
        phone2: '',
        phone3: '',
        marketing: '아니오'
    };

    const [formData, setFormData] = useState(initialState);
    const [showModal, setShowModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    // [데이터 로드] 가입 시 구조(address 객체, phone 문자열)에 맞춰 불러오기
    useEffect(() => {
        const loginData = localStorage.getItem('loginUser');
        if (loginData) {
            const user = JSON.parse(loginData);
            const phoneParts = user.phone ? user.phone.split('-') : ['', '', ''];

            setFormData({
                ...initialState,
                id: user.id || '',
                name: user.name || '',
                email: user.email || '',
                addr1: user.address?.addr1 || '',
                addr2: user.address?.addr2 || '',
                addr3: user.address?.addr3 || '',
                phone1: phoneParts[0] || '',
                phone2: phoneParts[1] || '',
                phone3: phoneParts[2] || '',
                marketing: user.marketing || '아니오'
            });
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // [정보 수정] 기존 구조를 유지하며 본인 정보만 업데이트
    const handleSave = () => {
        if (!formData.password || formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const updatedUser = {
            id: formData.id,
            password: formData.password,
            name: formData.name,
            email: formData.email,
            address: {
                addr1: formData.addr1,
                addr2: formData.addr2,
                addr3: formData.addr3,
                zipcode: formData.addr1
            },
            phone: `${formData.phone1}-${formData.phone2}-${formData.phone3}`,
            marketing: formData.marketing
        };

        localStorage.setItem('loginUser', JSON.stringify(updatedUser));
        
        const allUsers = JSON.parse(localStorage.getItem('회원정보') || '[]');
        const updatedList = allUsers.map(u => u.id === formData.id ? updatedUser : u);
        localStorage.setItem('회원정보', JSON.stringify(updatedList));

        alert('회원정보 수정이 완료되었습니다.');
        if (onSaveSuccess) onSaveSuccess();
        else onBack();
    };

    // [회원탈퇴] 본인 아이디만 필터링하여 삭제
    const handleLeaveSubmit = () => {
        if (!isConfirmed) {
            alert("탈퇴 동의 체크박스에 체크해 주세요.");
            return;
        }

        if (window.confirm("정말로 탈퇴하시겠습니까? 본인 계정 정보만 삭제됩니다.")) {
            const currentId = formData.id;

            // 전체 명단에서 '나'만 제외하고 다시 저장
            const allUsers = JSON.parse(localStorage.getItem('회원정보') || '[]');
            const remainingUsers = allUsers.filter(user => user.id !== currentId);
            localStorage.setItem('회원정보', JSON.stringify(remainingUsers));

            // 세션 정보 삭제
            localStorage.removeItem('loginUser');
            localStorage.removeItem('userProfile');

            alert("탈퇴가 완료되었습니다.");
            window.location.href = "/"; 
        }
    };

    const handleReset = () => {
        if (window.confirm("내용을 초기화하시겠습니까?")) {
            window.location.reload();
        }
    };

    // 레이아웃 보존을 위한 전체 JSX
    return (
        <div className="profile-edit-container">
            <div className="edit-header-box">
                <div className="header-top">
                    <h3 className="header-title">회원정보를 수정하고 싶으세요?</h3>
                </div>
                <p className="header-subtitle"> (*) 회원정보를 수정해 주세요. 필수값은 모두 입력하셔야 수정이 가능합니다.</p>

                <table className="edit-table">
                    <tbody>
                        <tr>
                            <th>아이디*</th>
                            <td><input type="text" name="id" value={formData.id} readOnly className="read-only-input" /></td>
                        </tr>
                        <tr>
                            <th>비밀번호*</th>
                            <td><input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="8~20자리 영문,숫자,특수문자 조합" /></td>
                        </tr>
                        <tr>
                            <th>비밀번호 재입력*</th>
                            <td><input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="확인을 위해 한번 더 입력하세요" /></td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td><input type="text" name="name" value={formData.name} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td><input type="email" name="email" value={formData.email} onChange={handleChange} className="email-input" /></td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <div className="address-group">
                                    <div className="address-row-top">
                                        <input type="text" name="addr1" value={formData.addr1} onChange={handleChange} className="postcode-input" placeholder="우편번호" />
                                        <button type="button" className="post-btn">우편번호</button>
                                    </div>
                                    <input type="text" name="addr2" value={formData.addr2} onChange={handleChange} className="address-full" placeholder="기본주소" />
                                    <input type="text" name="addr3" value={formData.addr3} onChange={handleChange} className="address-full" placeholder="상세주소" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td className="phone-td">
                                <div className="phone-wrapper">
                                    <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} />
                                    <span>-</span>
                                    <input type="text" name="phone2" value={formData.phone2} onChange={handleChange} />
                                    <span>-</span>
                                    <input type="text" name="phone3" value={formData.phone3} onChange={handleChange} />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th>마케팅 수신동의</th>
                            <td>
                                <div className="marketing-flex">
                                    <label className="radio-item">
                                        <input type="radio" name="marketing" value="예" checked={formData.marketing === '예'} onChange={handleChange} />
                                        <span>예</span>
                                    </label>
                                    <label className="radio-item">
                                        <input type="radio" name="marketing" value="아니오" checked={formData.marketing === '아니오'} onChange={handleChange} />
                                        <span>아니오</span>
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className="info-footer-box">
                    <ul className="info-list">
                        <li>목적: 각종 이벤트, 상품관련 정보 안내, 당사 상품, 서비스 안내 및 권유</li>
                        <li>항목: 이메일, SMS, 전화, 주소</li>
                        <li>보유기간: 회원 탈퇴 후 30일까지</li>
                    </ul>
                </div>
            </div>

            <div className="main-button-group">
                <button className="btn-save" onClick={handleSave}>입력정보등록</button>
                <button className="btn-reset" onClick={handleReset}>다시입력</button>
                <button className="btn-cancel" onClick={onBack}>취소</button>
                <button className="btn-leave" onClick={() => setShowModal(true)}>회원탈퇴</button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>회원 탈퇴 안내</h4>
                        <p>정말로 회원탈퇴를 하시겠습니까?</p>
                        <p className="modal-warning">탈퇴 시 본인의 모든 정보가 삭제됩니다.</p>
                        <div className="modal-check-area">
                            <input type="checkbox" id="leave-check" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} />
                            <label htmlFor="leave-check">안내 사항을 확인하였으며, 탈퇴에 동의합니다.</label>
                        </div>
                        <div className="modal-btns">
                            <button className="confirm-leave-btn" onClick={handleLeaveSubmit}>회원탈퇴하겠습니다</button>
                            <button className="close-modal-btn" onClick={() => setShowModal(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;