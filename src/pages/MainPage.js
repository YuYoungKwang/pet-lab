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
            const list = JSON.parse(data).map(f => ({
                ...f,
                liked: currentUser ? (currentUser.favorites || []).includes(f.id) : false
            }));
            setFundingList(list);
        }
    }, [currentUser]);

    // 좋아요 토글
    const handleLikeToggle = (id, liked) => {
        const updatedList = fundingList.map(item => {
            if (item.id === id) {
                const diff = liked ? 1 : -1;
                return { ...item, liked, likeCount: (item.likeCount || 0) + diff };
            }
            return item;
        });
        setFundingList(updatedList);
        localStorage.setItem("fundingList", JSON.stringify(updatedList));

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

    const handleCategoryClick = (cat) => {
        navigate(`/category/${cat}`);
    };

    const handleSearchSubmit = (term) => {
        if (!term.trim()) return;
        navigate(`/search?query=${encodeURIComponent(term)}`);
    };

    return (
        <main className="main-container">

            <div className="main-content">
                <FundingSection
                    title="인기 펀딩"
                    fundingList={[...fundingList].sort((a, b) => b.likeCount - a.likeCount)}
                    onLikeToggle={handleLikeToggle}
                />
                <FundingSection
                    title="방금 등록된 따끈따끈한 펀딩"
                    fundingList={[...fundingList].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
                    onLikeToggle={handleLikeToggle}
                />
                <FundingSection
                    title="마감 임박! 종료가 얼마 남지 않은 펀딩"
                    fundingList={[...fundingList].sort((a, b) => new Date(a.endDate) - new Date(b.endDate))}
                    onLikeToggle={handleLikeToggle}
                />
            </div>
            <div className="category-sidebar">
                <CategorySidebar

                    categories={categories}
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    onSearchSubmit={() => handleSearchSubmit(searchTerm)}
                    onCategoryClick={handleCategoryClick}
                />
            </div>
        </main>
    );
}

export default MainPage;
