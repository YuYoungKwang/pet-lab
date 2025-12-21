import { useState } from "react";
import '../styles/FundingDetailModal.css'
function FundingDetailModal({ visible, onClose, onAddToCart, onDirectPayment, selectedRewards }) {
    if (!visible) return null;

    const totalAmount = selectedRewards.reduce((sum, r) => sum + r.price * r.quantity, 0);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>후원 선택</h3>
                <div className="selected-rewards-list">
                    {selectedRewards.map(r => (
                        <div key={r.id} className="selected-reward-item">
                            <strong>{r.title}</strong> × {r.quantity}개
                            <span style={{ float: "right" }}>{r.price * r.quantity}₩</span>
                        </div>
                    ))}
                </div>
                <p style={{ marginTop: "10px", fontWeight: 600 }}>총 금액: {totalAmount}₩</p>
                <div className="modal-buttons">
                    <button onClick={onAddToCart}>장바구니에 추가</button>
                    <button onClick={onDirectPayment}>바로 결제</button>
                    <button onClick={onClose} className="cancel-btn">취소</button>
                </div>
            </div>
        </div>
    );
}


export default FundingDetailModal;