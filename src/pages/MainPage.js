import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BannerSlider from "../components/mainpage/BannerSlider";
import CategorySidebar from "../components/common/CategorySidebar";
import FundingSection from "../components/mainpage/FundingSection";
import '../styles/MainPage.css';

function MainPage({loginUser}) {
    const [fundingList, setFundingList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const categories = [
        "펫 푸드", "위생·미용", "장난감·훈련용품",
        "하우스·이동용품", "건강·케어",
        "의류·액세서리", "식기·급식기", "IT·스마트 용품"
    ];

    useEffect(() => {
        const data = localStorage.getItem("fundingList");
        if (data) setFundingList(JSON.parse(data));
    }, []);

    const handleLikeToggle = (id, liked) => {
        const updatedList = fundingList.map(item =>
            item.id === id
                ? { ...item, liked, likeCount: item.likeCount + (liked ? 1 : -1) }
                : item
        );
        setFundingList(updatedList);
        localStorage.setItem("fundingList", JSON.stringify(updatedList));
    };

    const handleCategoryClick = (cat) => {
        navigate(`/category/${cat}`);
    };

    // 🔹 검색 버튼/Enter 클릭 시 SearchResultPage로 이동
    const handleSearchSubmit = (term) => {
        navigate(`/search?query=${encodeURIComponent(term)}`);
    };

    return (
        <main className="main-container">
            <div className="top-area">
                <BannerSlider />
                <CategorySidebar
                    categories={categories}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearchSubmit={handleSearchSubmit}
                    onCategoryClick={handleCategoryClick}
                />
            </div>

            <FundingSection
                title="인기 펀딩"
                fundingList={fundingList}
                onLikeToggle={handleLikeToggle}
            />
            <FundingSection
                title="방금 등록된 따끈따끈한 펀딩"
                fundingList={fundingList}
                onLikeToggle={handleLikeToggle}
            />
            <FundingSection
                title="마감 임박! 종료가 얼마 남지 않은 펀딩"
                fundingList={fundingList}
                onLikeToggle={handleLikeToggle}
            />
        </main>
    );
}

export default MainPage;
