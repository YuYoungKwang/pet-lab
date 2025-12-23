import { useNavigate } from 'react-router';
import '../../styles/FundingCard.css';

const IMG_BASE = "/images/funding";

function FundingCard({ funding, onLikeToggle }) {
    const navigate = useNavigate();

    // 로컬스토리지에서 로그인 사용자 가져오기
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    // D-day 계산
    const end = new Date(funding.endDate);
    const today = new Date();
    let Dday = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    if (Dday < 0) {
        Dday = "펀딩 종료";
    } else if (Dday > 0) {
        Dday = "D-" + Dday;
    } else {
        Dday = "D-day"
    }

    // 진행률 (텍스트는 100% 이상도 표시)
    const progressRate = Math.round(
        (funding.currentAmount / funding.targetAmount) * 100
    );

    // 좋아요 토글
    const toggleLike = (e) => {
        e.stopPropagation(); // 카드 클릭 이벤트 방지

        if (!loginUser) {
            alert("로그인 후 이용해주세요!");
            navigate("/login");
            return;
        }

        if (onLikeToggle) onLikeToggle(funding.id, !funding.liked);
    };

    return (
        <div
            className="funding-card"
            onClick={() => navigate("/fundingDetail/" + funding.id)}
        >
            <div className="image-box">
                <img
                    className="image-box"
                    src={`${IMG_BASE}/${funding.thumbnailImage}`}
                    alt="thumbnail"
                />
                <span
                    className="heart"
                    style={{
                        color: funding.liked ? "red" : "gray",
                        cursor: "pointer",
                        userSelect: "none"
                    }}
                    onClick={toggleLike}
                >
                    ❤
                </span>
            </div>

            <div className="info">
                <p className="title">{funding.title}</p>
                <p className="meta">{Dday}</p>
                <div className="funding-progress-bar">
                    <div
                        className="funding-progress"
                        style={{ width: `${progressRate}%` }}
                    />
                </div>
                <p className="rate">{progressRate}%</p>
                <p>좋아요: {funding.likeCount}</p>
            </div>
        </div>
    );
}

export default FundingCard;
