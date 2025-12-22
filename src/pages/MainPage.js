import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import BannerSlider from "../components/mainpage/BannerSlider";
import CategorySidebar from "../components/common/CategorySidebar";
import FundingSection from "../components/mainpage/FundingSection";
import '../styles/MainPage.css';

function MainPage({ loginUser }) {
    const [fundingList, setFundingList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    const categories = [
        "펫 푸드", "위생·미용", "장난감·훈련용품",
        "하우스·이동용품", "건강·케어",
        "의류·액세서리", "식기·급식기", "IT·스마트 용품"
    ];

    // 회원정보 가져오기
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("회원정보")) || [];
        const me = users.find(u => u.id === loginUser?.id);
        setCurrentUser(me || null);
    }, [loginUser]);

    // fundingList 초기화 + currentUser favorites 기반 liked 세팅
    useEffect(() => {
        const data = localStorage.getItem("fundingList");
        if (data) {
            let list = JSON.parse(data);
            const favorites = Array.isArray(currentUser?.favorites) ? currentUser.favorites : [];
            list = list.map(f => ({
                ...f,
                liked: favorites.includes(f.id)
            }));
            setFundingList(list);
        }
    }, [currentUser]);

    // 좋아요 토글
    const handleLikeToggle = (id, liked) => {
        // 1. fundingList 업데이트
        const updatedList = fundingList.map(item =>
            item.id === id
                ? { ...item, liked, likeCount: item.likeCount + (liked ? 1 : -1) }
                : item
        );
        setFundingList(updatedList);
        localStorage.setItem("fundingList", JSON.stringify(updatedList));

        // 2. 회원정보 업데이트
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem("회원정보")) || [];
            const updatedUsers = users.map(user => {
                if (user.id === currentUser.id) {
                    const newFavorites = liked
                        ? [...(user.favorites || []), id]
                        : (user.favorites || []).filter(fid => fid !== id);
                    user.favorites = newFavorites;
                    return { ...user, favorites: newFavorites };
                }
                return user;
            });
            localStorage.setItem("회원정보", JSON.stringify(updatedUsers));
            setCurrentUser(updatedUsers.find(u => u.id === currentUser.id));
        }
    };

    // 카테고리 클릭
    const handleCategoryClick = (cat) => {
        navigate(`/category/${cat}`);
    };

    // 검색
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
                    onSearchSubmit={() => handleSearchSubmit(searchTerm)}
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
