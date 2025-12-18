import { useState, useEffect } from 'react';
import '../../styles/CategorySidebar.css'

function CategorySidebar({
    categories = [],
    searchTerm = "",
    onSearchChange = () => {},
    onSearchSubmit = () => {},
    onCategoryClick = () => {},
    selectedCategory = ""
}) {
    const [input, setInput] = useState(searchTerm);

    // 입력값이 외부 searchTerm과 동기화
    useEffect(() => {
        setInput(searchTerm);
    }, [searchTerm]);

    const handleSubmit = () => {
        onSearchSubmit(input);
    }

    return (
        <aside className="category-box">
            {/* 검색 입력 */}
            <input
                className="search"
                placeholder="검색어를 입력해주세요."
                value={input}
                onChange={e => {
                    setInput(e.target.value);
                    onSearchChange(e.target.value);
                }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            />
            <button onClick={handleSubmit}>검색</button>

            {/* 카테고리 목록 */}
            <ul className="category-list">
                {categories.map(c => (
                    <li
                        key={c}
                        onClick={() => onCategoryClick(c)}
                        className={c === selectedCategory ? "active" : ""}
                    >
                        {c}
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default CategorySidebar;
