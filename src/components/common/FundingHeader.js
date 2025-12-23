import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/FundingDetail.css";

const IMG_BASE = "/images/funding";

function FundingHeader({ funding }) {
    const navigate = useNavigate();

    // 진행률 (텍스트는 100% 이상도 표시)
    const progressRate = Math.round(
        (funding.currentAmount / funding.targetAmount) * 100
    );

    // 상태 계산
    const now = new Date();
    const endDate = new Date(funding.endDate);

    let statusText = "";
    let statusClass = "";

    if (now < endDate) {
        statusText = "펀딩 진행중";
        statusClass = "ongoing";
    } else if (funding.currentAmount >= funding.targetAmount) {
        statusText = "🎉 펀딩 성공!";
        statusClass = "success";
    } else {
        statusText = "펀딩 종료";
        statusClass = "fail";
    }

    function getSupporterCount(fundingId) {
        const members = JSON.parse(localStorage.getItem("회원정보")) || [];

        let count = 0;

        members.forEach(member => {
            const hasSupported = member.orders?.some(order =>
                order.status !== "취소됨" &&
                order.items.some(item => item.fundingId === fundingId)
            );

            if (hasSupported) count++;
        });

        return count;
    }


    return (
        <div className="funding-header">
            <img
                className="funding-header__thumb"
                src={`${IMG_BASE}/${funding.thumbnailImage}`}
                alt="thumbnail"
                onClick={() => navigate(`/fundingDetail/${funding.id}`)}
            />

            <div className="funding-header-info">
                <h1
                    className="funding-header__title"
                    onClick={() => navigate(`/fundingDetail/${funding.id}`)}
                >
                    {funding.title}
                </h1>

                {/* 상단 요약 카드 */}
                <div className="funding-header__summary">
                    <div className="funding-header__summary-item">
                        <span className="funding-header__label">모인금액</span>
                        <span className="funding-header__value funding-header__value--amount">
                            {funding.currentAmount.toLocaleString()}원
                        </span>
                    </div>

                    <div className="funding-header__summary-item">
                        <span className="funding-header__label">달성률</span>
                        <span className="funding-header__value">
                            {progressRate}%
                        </span>
                    </div>

                    <div className="funding-header__summary-item">
                        <span className="funding-header__label">후원자</span>
                        <span className="funding-header__value">
                            {getSupporterCount(funding.id)}명
                        </span>
                    </div>

                </div>

                {/* 진행률 바 */}
                <div className="funding-header__progress-bar">
                    <div
                        className="funding-header__progress"
                        style={{ width: `${Math.min(progressRate, 100)}%` }}
                    />
                </div>

                {/* 상태 표시 */}
                <div className={`funding-header__status funding-header__status--${statusClass}`}>
                    {statusText}
                </div>

                {/* 상세 정보 */}
                <div className="funding-header__meta">
                    <p>목표 금액: {funding.targetAmount.toLocaleString()}원</p>
                    <p>펀딩 기간: {funding.startDate} ~ {funding.endDate}</p>
                    <p>결제: 목표 달성 시 {funding.paymentDate} 결제 진행</p>
                    <p>배송 예정일: {funding.expectedDeliveryDate}</p>
                </div>
            </div>
        </div>
    );
}

export default FundingHeader;
