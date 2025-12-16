import BannerSlider from "../components/mainpage/BannerSlider";
import CategorySidebar from "../components/common/CategorySidebar";
import FundingSection from "../components/mainpage/FundingSection";
import '../styles/MainPage.css'
function MainPage() {
    return (
        <main className="main-container">
            <div className="top-area">
                <BannerSlider />
                <CategorySidebar />
            </div>

            <FundingSection title="인기 펀딩" />
            <FundingSection title="방금 등록된 따끈따끈한 펀딩" />
            <FundingSection title="펫랩이 추천합니다!" />
        </main>
    );
}

export default MainPage;
