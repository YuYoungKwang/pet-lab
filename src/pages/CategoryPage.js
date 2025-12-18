import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import FundingCard from "../components/common/FundingCard";
import CategorySidebar from "../components/common/CategorySidebar";
import '../styles/CategoryPage.css';

const PAGE_SIZE = 6;

function CategoryPage() {
    const { categoryName: paramCategory } = useParams();
    const navigate = useNavigate();

    const [fundingList, setFundingList] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(paramCategory || "전체");
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        "전체", "펫 푸드", "위생·미용", "장난감·훈련용품",
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
        setSelectedCategory(cat);
        navigate(cat === "전체" ? `/category/전체` : `/category/${cat}`);
        setCurrentPage(1);
    };

    const handleSearchSubmit = () => {
        setSearchTerm(inputValue);
        setCurrentPage(1);
    };

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
