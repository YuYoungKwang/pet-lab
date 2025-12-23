import { useState, useEffect } from "react";
import FundingCard from "../components/common/FundingCard";
import CategorySidebar from "../components/common/CategorySidebar";
import '../styles/CategoryPage.css';

const PAGE_SIZE = 8;

function FavoritePage({ loginUser }) {
    const [fundingList, setFundingList] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("전체");
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        "전체", "펫 푸드", "위생·미용", "장난감·훈련용품",
        "하우스·이동용품", "건강·케어",
        "의류·액세서리", "식기·급식기", "IT·스마트 용품"
    ];

    // 🔹 회원정보 가져오기
    useEffect(() => {
        const users = JSON.parse(localStorage.getItem("회원정보")) || [];
        const me = users.find(u => u.id === loginUser?.id);
        setCurrentUser(me || null);
    }, [loginUser]);

    // 🔹 fundingList 초기화 + favorites 기반 liked 세팅
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

    // 🔹 좋아요 토글
    const handleLikeToggle = (id, liked) => {
        const updatedList = fundingList.map(item =>
            item.id === id
                ? { ...item, liked, likeCount: item.likeCount + (liked ? 1 : -1) }
                : item
        );
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
        setSelectedCategory(cat);
        setCurrentPage(1);
    };

    // 🔹 좋아요한 상품만 필터링 + 카테고리 적용
    const filteredList = fundingList.filter(
        item => item.liked && (selectedCategory === "전체" || item.category === selectedCategory)
    );

    const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedList = filteredList.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <main className="category-page-container">
            

            <div className="category-content">
                <h2>좋아요한 상품</h2>
                {paginatedList.length > 0 ? (
                    <div className="funding-grid">
                        {paginatedList.map(item => (
                            <FundingCard
                                key={item.id}
                                funding={item}
                                onLikeToggle={handleLikeToggle}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="no-results">좋아요한 상품이 없습니다.</p>
                )}

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={page === currentPage ? "pagination-button-active" : "pagination-button"}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>

            <CategorySidebar
                categories={categories}
                searchTerm=""
                onSearchChange={() => {}}
                onSearchSubmit={() => {}}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
            />
        </main>
    );
}

export default FavoritePage;
