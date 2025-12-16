import '../../styles/CategorySidebar.css'
function CategorySidebar() {
    const categories = [
        '펫 푸드', '위생·미용', '장난감·훈련용품',
        '하우스·이동용품', '건강·케어',
        '의류·액세서리', '식기·급식기', 'IT·스마트 용품'
    ];

    return (
        <aside className="category-box">
            <input className="search" placeholder="검색어를 입력해주세요." />
            <ul>
                {categories.map(c => <li key={c}>{c}</li>)}
            </ul>
        </aside>
    );
}

export default CategorySidebar;