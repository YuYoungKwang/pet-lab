import FundingCard from "../common/FundingCard";
import '../../styles/FundingSection.css'
function FundingSection({ title }) {
    return (
        <section className="funding-section">
            <h2>{title}</h2>
            <div className="funding-grid">
                {[1, 2, 3, 4].map(i => (
                    <FundingCard key={i} />
                ))}
            </div>
        </section>
    );
}

export default FundingSection;