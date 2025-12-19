import React from "react";
import '../../styles/FundingDetail.css';

const IMG_BASE = "/images/funding";

function FundingHeader({ funding }) {
    const progressRate = Math.min(
        100,
        Math.round((funding.currentAmount / funding.targetAmount) * 100)
    );

    return (
        <div className="funding-header">
            <img
                className="funding-header-thumb"
                src={`${IMG_BASE}/${funding.thumbnailImage}`}
                alt="thumbnail"
            />

            <div className="funding-header-info">
                <h1>{funding.title}</h1>
                <br />
                <p>모인 금액: {funding.currentAmount.toLocaleString()}원</p>

                <div className="funding-progress-bar">
                    <div
                        className="funding-progress"
                        style={{ width: `${progressRate}%` }}
                    />
                </div>
                <br />
                <p>달성률: {progressRate}%</p>
                <p>목표 금액: {funding.targetAmount.toLocaleString()}원</p>
                <p>펀딩 기간: {funding.startDate} ~ {funding.endDate}</p>
                <p>결제 : 펀딩목표 달성시 {funding.paymentDate}에 결제 진행</p>
                <p>배송예정일 : {funding.expectedDeliveryDate}</p>
            </div>
        </div>
    );
}

export default FundingHeader;
