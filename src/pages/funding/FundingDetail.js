import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "../../styles/FundingDetail.css";

const IMG_BASE = "/images/funding"; // ✅ 모든 이미지 경로 통일

function FundingDetail() {

    const [funding, setFunding] = useState(null);
    const { fundingId } = useParams();

    useEffect(() => {
        const result = getFundingById(fundingId);
        setFunding(result);
    }, [fundingId]);

    const getFundingById = (fundingid) => {
        const data = localStorage.getItem("fundingList");
        if (!data) return null;

        const fundings = JSON.parse(data);
        return fundings.find(funding => funding.id === Number(fundingId));
    };


    if (!funding) {
        return <div className="funding-detail-empty">펀딩 정보를 찾을 수 없습니다.</div>;
    }

    const progressRate = Math.min(
        100,
        Math.round((funding.currentAmount / funding.targetAmount) * 100)
    );

    return (
        <div className="funding-detail-page">
            {/* ================= 상단 ================= */}
            <div className="funding-header">
                <img
                    className="funding-header-thumb"
                    src={`${IMG_BASE}/${funding.thumbnailImage}`}
                    alt="thumbnail"
                />

                <div className="funding-header-info">
                    <h1>{funding.title}</h1>
                    <br></br>
                    <p>모인 금액: {funding.currentAmount.toLocaleString()}원</p>

                    <div className="funding-progress-bar">
                        <div
                            className="funding-progress"
                            style={{ width: `${progressRate}%` }}
                        />
                    </div>
                    <br></br>
                    <p>달성률: {progressRate}%</p>
                    <p>목표 금액: {funding.targetAmount.toLocaleString()}원</p>
                    <p>펀딩 기간: {funding.startDate} ~ {funding.endDate}</p>
                    <p>결제 : 펀딩목표 달성시 {funding.paymentDate}에 결제 진행</p>
                    <p>배송예정일 : {funding.expectedDeliveryDate}</p>
                </div>
            </div>

            {/* ================= 본문 ================= */}
            <div className="funding-body">
                {/* 메인 콘텐츠 */}
                <div className="funding-main">
                    <section>
                        <h2>프로젝트 소개</h2>
                        <p>{funding.description}</p>
                        <div className="intro-images">
                            {funding.introImages.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>리워드 안내</h2>
                        <p>{funding.rewards.rewardExplain}</p>
                        <div className="reward-images">
                            {funding.rewards.images.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>예산</h2>
                        <p>{funding.budget}</p>
                    </section>

                    <section>
                        <h2>일정</h2>
                        <p>{funding.schedule}</p>
                    </section>

                    <section>
                        <h2>팀 소개</h2>
                        <p>{funding.team.description}</p>
                        <div className="team-images">
                            {funding.team.images.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section>
                        <h2>신뢰와 안전</h2>
                        <p>{funding.safetyInfo.policy}</p>
                    </section>
                </div>

                {/* 사이드바 */}
                <aside className="funding-sidebar">
                    <h2>후원 리워드</h2>
                    <br/>
                    <br/>
                    {
                        funding.rewardSelects.map((v, i) => {
                            let tempDescription = v.description.split("\n");

                            return (
                                <div>
                                    <hr/>
                                    <label>
                                        <h5>{v.title}</h5>
                                        {tempDescription.map((v)=>{return <p>{v}</p>;})}
                                        <h4>{v.price} ₩</h4>
                                    </label>
                                </div>
                            );
                        })
                    }
                    <button>후원하기</button>
                </aside>
            </div>
        </div>
    );
}

export default FundingDetail