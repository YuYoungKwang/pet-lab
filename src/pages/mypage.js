import { Navigate } from "react-router-dom";
import '../styles/MyPage.css';


function MyPage({ loginUser }) {
    if (!loginUser) {
        return <Navigate to="/login" replace />;
    }



    const orderStatus = [
        { label: '입금전', count: 0 },
        { label: '배송준비중', count: 0 },
        { label: '배송중', count: 0 },
        { label: '배송완료', count: 0 },
    ];

    const menuItems = [
        { title: 'Order', sub: '주문내역 조회', desc: '고객님께서 주문하신 상품의 주문내역을 확인하실 수 있습니다.', icon: '📜' },
        { title: 'Profile', sub: '회원정보', desc: '회원이신 고객님의 개인정보를 관리하는 공간입니다.', icon: '👤' },
        { title: 'Wishlist', sub: '관심상품', desc: '관심상품으로 등록하신 상품의 목록을 보여드립니다.', icon: '🎁' },
        { title: 'Board', sub: '게시물 관리', desc: '고객님께서 작성하신 게시물을 관리하는 공간입니다.', icon: '📝' },
        { title: 'Address', sub: '배송 주소록 관리', desc: '자주 사용하는 배송지를 등록하고 관리하실 수 있습니다.', icon: '🚚' },
        { title: 'FAQ', sub: '자주 묻는 질문', desc: '고객센터 1:1문의', icon: '🎧' },
    ];

    return (
        <div className="mypage-container">
            <div>
                <h2>{loginUser.name}님 환영합니다</h2>
                <p>아이디: {loginUser.id}</p>
                <p>이메일: {loginUser.email}</p>
            </div>
            <header className="mypage-header">
                <h1>마이페이지</h1>
                <div className="breadcrumb">🏠  마이페이지  내정보</div>
            </header>

            {/* 주문 처리 현황 섹션 */}
            <section className="order-status-box">
                <h3>나의 주문처리 현황 <span>최근 3개월 기준</span></h3>
                <div className="status-grid">
                    {orderStatus.map((item, idx) => (
                        <div key={idx} className="status-item">
                            <div className="status-label">{item.label}</div>
                            <div className="status-count">{item.count}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 메뉴 카드 섹션 */}
            <section className="menu-grid">
                {menuItems.map((item, idx) => (
                    <div key={idx} className="menu-card">
                        <div className="menu-icon">{item.icon}</div>
                        <h4>{item.title}</h4>
                        <h5>{item.sub}</h5>
                        <p>{item.desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default MyPage;