import FundingCard from "../common/FundingCard";
import '../../styles/FundingSection.css'

function FundingSection({ title, fundingList, onLikeToggle }) {

    const now = new Date();

    // 종료되지 않은 펀딩만
    const activeList = fundingList.filter(
        f => new Date(f.endDate) >= now
    );

    let sortedList = [];

    if (title === "인기 펀딩") {
        sortedList = [...activeList].sort(
            (a, b) => b.likeCount - a.likeCount
        );
    } else if (title === "방금 등록된 따끈따끈한 펀딩") {
        sortedList = [...activeList].sort(
            (a, b) => b.id - a.id
        );
    } else if (title === "마감 임박! 종료가 얼마 남지 않은 펀딩") {
        sortedList = [...activeList].sort(
            (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
    }

    const displayedList = sortedList.slice(0, 4);

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
