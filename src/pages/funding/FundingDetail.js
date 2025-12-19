import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FundingHeader from "../../components/common/FundingHeader";
import FundingNavbar from "../../components/funding/FundingNavbar";
import "../../styles/FundingDetail.css";

const IMG_BASE = "/images/funding";

function FundingDetail() {
    const [funding, setFunding] = useState(null);
    const { fundingId } = useParams();

    useEffect(() => {
        const result = getFundingById(fundingId);
        setFunding(result);
    }, [fundingId]);

    const getFundingById = (id) => {
        const data = localStorage.getItem("fundingList");
        if (!data) return null;
        const fundings = JSON.parse(data);
        return fundings.find(f => f.id === Number(id));
    };

    if (!funding) {
        return <div className="funding-detail-empty">펀딩 정보를 찾을 수 없습니다.</div>;
    }

    const sections = [
        { id: "project-intro", label: "프로젝트 소개" },
        { id: "rewards", label: "리워드 안내" },
        { id: "budget", label: "예산" },
        { id: "schedule", label: "일정" },
        { id: "team", label: "팀 소개" },
        { id: "safety", label: "신뢰와 안전" },
    ];

    return (
        <div className="funding-detail-page">
            {/* 상단 헤더 */}
            <FundingHeader funding={funding} />

            {/* 네비바 */}
            <FundingNavbar sections={sections} />

            <div className="funding-body">
                {/* 메인 콘텐츠 */}
                <div className="funding-main">
                    <section id="project-intro">
                        <h2>프로젝트 소개</h2>
                        <p>{funding.description}</p>
                        <div className="intro-images">
                            {funding.introImages.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section id="rewards">
                        <h2>리워드 안내</h2>
                        <p>{funding.rewards.rewardExplain}</p>
                        <div className="reward-images">
                            {funding.rewards.images.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section id="budget">
                        <h2>예산</h2>
                        <p>{funding.budget}</p>
                    </section>

                    <section id="schedule">
                        <h2>일정</h2>
                        <p>{funding.schedule}</p>
                    </section>

                    <section id="team">
                        <h2>팀 소개</h2>
                        <p>{funding.team.description}</p>
                        <div className="team-images">
                            {funding.team.images.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section id="safety">
                        <h2>신뢰와 안전</h2>
                        <p>{funding.safetyInfo.policy}</p>
                    </section>
                </div>

                {/* 사이드바 */}
                <aside className="funding-sidebar">
                    <h2>후원 리워드</h2>
                    <br/>
                    {funding.rewardSelects.map((v, i) => {
                        const tempDescription = v.description.split("\n");
                        return (
                            <div key={i}>
                                <hr/>
                                <label>
                                    <h5>{v.title}</h5>
                                    {tempDescription.map((t, idx) => <p key={idx}>{t}</p>)}
                                    <h4>{v.price} ₩</h4>
                                </label>
                            </div>
                        );
                    })}
                    <button>후원하기</button>
                </aside>
            </div>
        </div>
    );
}

export default FundingDetail;
