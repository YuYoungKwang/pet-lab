import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import '../styles/MyPage.css';

function MyPage({ loginUser }) {
    const navigate = useNavigate();

    if (!loginUser) {
        return <Navigate to="/login" replace />;
    }

    // const orderStatus = [
    //     { label: '입금전', count: 0 }, { label: '배송준비중', count: 0 },
    //     { label: '배송중', count: 0 }, { label: '배송완료', count: 0 },
    // ];

    const menuItems = [
        { id: 'order', title: 'CART', sub: '장바구니', icon: '📜', desc: '장바구니을 확인하실 수 있습니다.',path: '/cart' },
        { id: 'profile', title: 'PROFILE', sub: '회원정보', icon: '👤', desc: '개인정보를 관리하는 공간입니다.', path: '/profile'},
        { id: 'wishlist', title: 'WISHLIST', sub: '관심상품', icon: '🎁', desc: '관심상품 목록을 보여드립니다.',path: '/wishlist' },
        { id: 'board', title: 'BOARD', sub: '게시물 관리', icon: '📝', desc: '작성하신 게시물을 관리합니다.',path: '/board' },
        { id: 'address', title: 'ORDER', sub: '주문조회', icon: '🚚', desc: '주문내역을 확인하실 수 있습니다.',path: '/order' },
        { id: 'faq', title: 'FAQ', sub: '자주 묻는 질문', icon: '🎧', desc: '고객센터 1:1문의',path: '/faq' },
    ];

    return (
        <div className="mypage-container">
            <div className="user-welcome">
                <h2>{loginUser.name}님 환영합니다</h2>
                <p>아이디: {loginUser.id} | 이메일: {loginUser.email}</p>
            </div>

            <header className="mypage-header" style={{ borderBottom: '1px solid #000', marginBottom: '20px', overflow: 'hidden' }}>
                {/* 텍스트 클릭 시 마이페이지 루트 경로로 이동 */}
                <h1 onClick={() => navigate('/mypage')} style={{ cursor: 'pointer', fontSize: '24px', float: 'left' }}>
                    마이페이지
                </h1>
                <div className="breadcrumb" style={{ float: 'right', fontSize: '12px', lineHeight: '40px' }}>🏠 마이페이지</div>
            </header>
{/* 
            <section className="order-status-box" style={{ border: '1px solid #ddd', padding: '20px', marginBottom: '30px' }}>
                <h3 style={{ fontSize: '16px', marginBottom: '15px' }}>나의 주문처리 현황 <span style={{ fontSize: '12px', color: '#888' }}>최근 3개월 기준</span></h3>
                <div className="status-grid" style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {orderStatus.map((item, idx) => (
                        <div key={idx} className="status-item" style={{ textAlign: 'center', border: '1px solid #eee', flex: 1, padding: '10px' }}>
                            <div style={{ fontSize: '13px', marginBottom: '5px' }}>{item.label}</div>
                            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>{item.count}</div>
                        </div>
                    ))}
                </div>
            </section> */}

            <section className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', backgroundColor: '#ddd', border: '1px solid #ddd' }}>
                {menuItems.map((item, idx) => (
                    <div 
                        key={idx} 
                        className="menu-card" 
                        onClick={() => navigate(item.path)} // URL 이동
                        style={{ backgroundColor: '#fff', padding: '40px 20px', textAlign: 'center', cursor: 'pointer' }}
                    >
                        <div style={{ fontSize: '40px', marginBottom: '10px' }}>{item.icon}</div>
                        <h4 style={{ fontSize: '12px', color: '#888', fontWeight: 'bold' }}>{item.title}</h4>
                        <h5 style={{ fontSize: '16px', margin: '5px 0', fontWeight: 'bold' }}>{item.sub}</h5>
                        <p style={{ fontSize: '12px', color: '#aaa', lineHeight: '1.4' }}>{item.desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default MyPage;
