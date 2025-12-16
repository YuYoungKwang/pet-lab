import '../../styles/FundingCard.css'

function FundingCard() {
    return (
        <div className="funding-card">
            <div className="image-box">
                <span className="heart">♡</span>
            </div>

            <div className="info">
                <p className="title">제목</p>
                <p className="meta">D-day · 펀딩상태</p>
                <p className="rate">달성률 %</p>
            </div>
        </div>
    );
}

export default FundingCard;