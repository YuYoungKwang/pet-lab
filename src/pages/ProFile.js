import React, { useState, useEffect } from 'react';
import '../styles/ProFile.css';

function Profile({ onBack, onSaveSuccess }) {
    const initialState = {
        id: '',
        currentPassword: '', // [추가] 현재 비밀번호 입력용
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
    const [dbPassword, setDbPassword] = useState(''); // [추가] 기존 비번 대조용
    const [showModal, setShowModal] = useState(false);
    const [isConfirmed, setIsConfirmed] = useState(false);

    useEffect(() => {
        const loginData = localStorage.getItem('loginUser');
        if (loginData) {
            const user = JSON.parse(loginData);
            setDbPassword(user.password || ''); // 로컬스토리지의 실제 비번 저장

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
        if (name === 'id') return;

        // 비밀번호 필드들 공백 제거
        const noSpaceNames = ['currentPassword', 'password', 'confirmPassword'];
        const finalValue = noSpaceNames.includes(name) ? value.replace(/\s/g, '') : value;
        
        setFormData(prev => ({ ...prev, [name]: finalValue }));
    };

    const validateFields = () => {
        // [추가] 현재 비밀번호가 로컬스토리지 값과 일치하는지 먼저 확인
        if (formData.currentPassword !== dbPassword) {
            alert('현재 비밀번호가 일치하지 않습니다.');
            return false;
        }

        if (formData.password.length < 8 || formData.password.length > 20) {
            alert('비밀번호는 8자 이상 20자 이하로 입력해주세요. (공백 불가)');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return false;
        }

        return true;
    };

    const handleSave = () => {
        if (!validateFields()) return;

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

        if (onSaveSuccess) {
            onSaveSuccess();
        } else if (onBack) {
            onBack();
        } else {
            window.location.href = "/mypage"; 
        }
    };

    const handleReset = () => {
        if (window.confirm("내용을 초기화하시겠습니까? 아이디는 유지됩니다.")) {
            setFormData(prev => ({
                ...initialState,
                id: prev.id
            }));
        }
    };

    const handleLeaveSubmit = () => {
        if (!isConfirmed) {
            alert("탈퇴 동의 체크박스에 체크해 주세요.");
            return;
        }
        if (window.confirm("정말로 탈퇴하시겠습니까?")) {
            const currentId = formData.id;
            const allUsers = JSON.parse(localStorage.getItem('회원정보') || '[]');
            const remainingUsers = allUsers.filter(user => user.id !== currentId);
            localStorage.setItem('회원정보', JSON.stringify(remainingUsers));
            localStorage.removeItem('loginUser');
            alert("탈퇴가 완료되었습니다.");
            window.location.href = "/"; 
        }
    };

    return (
        <div className="profile-edit-container">
            <div className="edit-header-box">
                <div className="header-top">
                    <h3 className="header-title">회원정보를 수정하고 싶으세요?</h3>
                </div>
                <p className="header-subtitle"> (*) 필수값은 모두 입력하셔야 수정이 가능합니다.</p>

                <table className="edit-table">
                    <tbody>
                        <tr>
                            <th>아이디*</th>
                            <td>
                                <input 
                                    type="text" 
                                    name="id" 
                                    value={formData.id} 
                                    readOnly 
                                    tabIndex="-1"
                                    className="read-only-input" 
                                    style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                                />
                            </td>
                        </tr>
                        {/* [수정] 현재 비밀번호 입력 필드 추가 */}
                        <tr>
                            <th>현재 비밀번호*</th>
                            <td>
                                <input 
                                    type="password" 
                                    name="currentPassword" 
                                    value={formData.currentPassword} 
                                    onChange={handleChange} 
                                    placeholder="기존 비밀번호를 입력하세요" 
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호*</th>
                            <td>
                                <input 
                                    type="password" 
                                    name="password" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    placeholder="8~20자리 영문,숫자,특수문자 조합" 
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 재입력*</th>
                            <td>
                                <input 
                                    type="password" 
                                    name="confirmPassword" 
                                    value={formData.confirmPassword} 
                                    onChange={handleChange} 
                                    placeholder="확인을 위해 한번 더 입력하세요" 
                                />
                            </td>
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
            </div>

            <div className="main-button-group">
                <button className="btn-save" onClick={handleSave}>입력정보등록</button>
                <button className="btn-reset" onClick={handleReset}>다시입력</button>
                <button className="btn-cancel" onClick={() => onBack && onBack()}>취소</button>
                <button className="btn-leave" onClick={() => setShowModal(true)}>회원탈퇴</button>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>회원 탈퇴 안내</h4>
                        <p>정말로 회원탈퇴를 하시겠습니까?</p>
                        <div className="modal-check-area">
                            <input type="checkbox" id="leave-check" checked={isConfirmed} onChange={(e) => setIsConfirmed(e.target.checked)} />
                            <label htmlFor="leave-check">안내 사항 확인 및 탈퇴 동의</label>
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