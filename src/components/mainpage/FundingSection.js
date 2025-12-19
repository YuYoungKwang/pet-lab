import FundingCard from "../common/FundingCard";
import '../../styles/FundingSection.css'

function FundingSection({ title, fundingList, onLikeToggle }) {

    // 정렬 기준
    let sortedList = [];
    if(title === "인기 펀딩"){
        sortedList = [...fundingList].sort((a, b) => b.likeCount - a.likeCount);
    } else if(title === "방금 등록된 따끈따끈한 펀딩"){
        sortedList = [...fundingList].sort((a, b) => b.id - a.id);
    } else if(title === "마감 임박! 종료가 얼마 남지 않은 펀딩"){
        sortedList = [...fundingList].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));
    }

    const displayedList = sortedList.slice(0, 4); // 최대 4개

    return (
        <section className="funding-section">
            <h2>{title}</h2>
            <div className="funding-grid">
                {displayedList.map(funding => (
                    <FundingCard
                        key={funding.id}
                        funding={funding}
                        onLikeToggle={onLikeToggle}
                    />
                ))}
            </div>
        </section>
    );
}

export default FundingSection;
