import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import FundingCard from "../components/common/FundingCard";
import CategorySidebar from "../components/common/CategorySidebar";
import '../styles/CategoryPage.css';

const PAGE_SIZE = 6;

function CategoryPage({ loginUser }) {
    const { categoryName: paramCategory } = useParams();
    const navigate = useNavigate();

    const [fundingList, setFundingList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(paramCategory || "전체");
    const [currentPage, setCurrentPage] = useState(1);
    const [currentUser, setCurrentUser] = useState(null); // 회원정보

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

    // 🔹 fundingList 초기화 + currentUser favorites 기반 liked 세팅
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

    // 🔹 좋아요 토글 & 회원정보 동기화
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
        setSelectedCategory(cat);
        navigate(cat === "전체" ? `/category/전체` : `/category/${cat}`);
        setCurrentPage(1);
    };

    // 검색
    const handleSearchSubmit = () => {
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };

    // 필터링 + 페이징
    const filteredList = fundingList.filter(item =>
        (selectedCategory === "전체" || item.category === selectedCategory) &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);
    const startIndex = (currentPage - 1) * PAGE_SIZE;
    const paginatedList = filteredList.slice(startIndex, startIndex + PAGE_SIZE);

    return (
        <main className="category-page-container">
            <CategorySidebar
                categories={categories}
                searchTerm={inputValue}
                onSearchChange={setInputValue}
                onSearchSubmit={handleSearchSubmit}
                selectedCategory={selectedCategory}
                onCategoryClick={handleCategoryClick}
            />

            <div className="category-content">
                <h2>{selectedCategory} 펀딩</h2>
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
                    <p className="no-results">검색 결과가 없습니다.</p>
                )}

                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                            key={page}
                            className={page === currentPage ? "active" : ""}
                            onClick={() => setCurrentPage(page)}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            </div>
        </main>
    );
}

export default CategoryPage;
