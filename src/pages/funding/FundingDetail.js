import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import FundingHeader from "../../components/common/FundingHeader";
import FundingNavbar from "../../components/funding/FundingNavbar";
import FundingDetailModal from "../FundingDetailModal";
import "../../styles/FundingDetail.css";

const IMG_BASE = "/images/funding";

function FundingDetail({ loginUser }) {
    const navigate = useNavigate();
    const { fundingId } = useParams();
    const [funding, setFunding] = useState(null);
    const [selectedRewards, setSelectedRewards] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [showTopButton, setShowTopButton] = useState(false);

    const sidebarRef = useRef(null);
    const topRef = useRef(null);

    // 펀딩 정보 가져오기
    useEffect(() => {
        const fundingList = JSON.parse(localStorage.getItem("fundingList")) || [];
        const currentFunding = fundingList.find(f => f.id === Number(fundingId));
        setFunding(currentFunding);
    }, [fundingId]);

    // TOP 버튼 표시 여부
    useEffect(() => {
        const handleScroll = () => setShowTopButton(window.scrollY > 300);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // 리워드 선택
    const handleSelectReward = (reward, index) => {
        setSelectedRewards(prev => {
            if (prev.find(r => r.index === index)) return prev;

            const updated = [
                ...prev,
                {
                    ...reward,
                    index,
                    quantity: 1,
                    fundingId: funding.id, // ✅ fundingId 추가
                },
            ];

            if (sidebarRef.current) {
                sidebarRef.current.scrollTo({ top: 0, behavior: "smooth" });
            }
            return updated;
        });
    };

    // 수량 업데이트
    const updateQuantity = (index, delta) => {
        setSelectedRewards(prev =>
            prev.map(r => r.index === index ? { ...r, quantity: Math.max(1, r.quantity + delta) } : r)
        );
    };

    // 리워드 삭제
    const removeReward = (index) => {
        setSelectedRewards(prev => prev.filter(r => r.index !== index));
    };

    // 장바구니 추가
    const handleAddToCart = () => {
        if (selectedRewards.length === 0) {
            alert("후원할 리워드를 선택해주세요.");
            return;
        }

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const memberIndex = members.findIndex(m => m.id === loginUser.id);
        if (memberIndex === -1) return alert("회원 정보를 찾을 수 없습니다.");

        selectedRewards.forEach(r => {
            const exist = members[memberIndex].cart.find(
                item => item.fundingId === r.fundingId && item.rewardIndex === r.index
            );
            if (exist) exist.quantity += r.quantity;
            else members[memberIndex].cart.push({
                fundingId: r.fundingId,
                rewardIndex: r.index,
                title: r.title,
                price: r.price,
                description: r.description,
                quantity: r.quantity,
            });
        });

        localStorage.setItem("회원정보", JSON.stringify(members));
        alert("장바구니에 추가되었습니다!");
        setModalVisible(false);
        setSelectedRewards([]);
    };

    // 바로 결제
    const handleDirectPayment = () => {
        if (selectedRewards.length === 0) {
            alert("선택된 리워드가 없습니다.");
            return;
        }

        const totalAmount = selectedRewards.reduce((sum, r) => sum + r.price * r.quantity, 0);

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const memberIndex = members.findIndex(m => m.id === loginUser.id);
        if (memberIndex === -1) return alert("회원 정보를 찾을 수 없습니다.");

        // 주문 추가
        const newOrder = {
            orderId: `order_${Date.now()}`,
            items: selectedRewards.map(r => ({
                fundingId: r.fundingId,
                rewardIndex: r.index,
                title: r.title,
                price: r.price,
                quantity: r.quantity
            })),
            totalAmount,
            status: "결제완료",
            orderDate: new Date().toISOString(),
        };
        members[memberIndex].orders.push(newOrder);

        // 펀딩 금액 업데이트
        const fundingList = JSON.parse(localStorage.getItem("fundingList")) || [];
        const fundingIndex = fundingList.findIndex(f => f.id === funding.id);
        if (fundingIndex !== -1) {
            fundingList[fundingIndex].currentAmount += totalAmount;
            setFunding(fundingList[fundingIndex]);
            localStorage.setItem("fundingList", JSON.stringify(fundingList));
        }

        localStorage.setItem("회원정보", JSON.stringify(members));
        setSelectedRewards([]);
        setModalVisible(false);
        alert(`결제가 완료되었습니다! 총 금액: ${totalAmount}₩`);
    };

    const scrollToTop = () => {
        if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth" });
    };

    if (!funding) return <div className="funding-detail-empty">펀딩 정보를 찾을 수 없습니다.</div>;

    const sections = [
        { id: "project-intro", label: "프로젝트 소개" },
        { id: "rewards", label: "리워드 안내" },
        { id: "budget", label: "예산" },
        { id: "schedule", label: "일정" },
        { id: "team", label: "팀 소개" },
        { id: "safety", label: "신뢰와 안전" },
    ];

    return (
        <div className="funding-detail-page" ref={topRef}>
            <FundingHeader funding={funding} />

            {loginUser?.id === funding.createUser && (
                <div className="edit-button-container">
                    <button onClick={() => navigate(`/fundingEdit/${funding.id}`)}>수정</button>
                </div>
            )}

            <FundingNavbar sections={sections} />

            <div className="funding-body">
                <div className="funding-main">
                    {/* 프로젝트 소개 */}
                    <section id="project-intro">
                        <h2>프로젝트 소개</h2>
                        <p>{funding.description}</p>
                        <div className="intro-images">
                            {funding.introImages.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    {/* 리워드 안내 */}
                    <section id="rewards">
                        <h2>리워드 안내</h2>
                        <p>{funding.rewards.rewardExplain}</p>
                        <div className="reward-images">
                            {funding.rewards.images.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>

                    <section id="budget"><h2>예산</h2><p>{funding.budget}</p></section>
                    <section id="schedule"><h2>일정</h2><p>{funding.schedule}</p></section>
                    <section id="team">
                        <h2>팀 소개</h2>
                        <p>{funding.team.description}</p>
                        <div className="team-images">
                            {funding.team.images.map((img, i) => (
                                <img key={i} src={`${IMG_BASE}/${img}`} alt={img} />
                            ))}
                        </div>
                    </section>
                    <section id="safety"><h2>신뢰와 안전</h2><p>{funding.safetyInfo.policy}</p></section>
                </div>

                {/* 사이드바 */}
                <aside className="funding-sidebar" ref={sidebarRef}>
                    <h2>후원 리워드</h2>

                    {/* 선택된 리워드 */}
                    {selectedRewards.length > 0 && (
                        <div className="selected-reward-summary">
                            {selectedRewards.map(r => (
                                <div key={r.index} className="selected-reward-item">
                                    <h4>{r.title}</h4>
                                    <p>가격: {r.price} ₩</p>
                                    <div className="quantity-control">
                                        <button onClick={() => updateQuantity(r.index, -1)}>-</button>
                                        <span>{r.quantity}</span>
                                        <button onClick={() => updateQuantity(r.index, 1)}>+</button>
                                        <button onClick={() => removeReward(r.index)}>삭제</button>
                                    </div>
                                    <p>총 금액: {r.price * r.quantity} ₩</p>
                                </div>
                            ))}
                        </div>
                    )}

                    <br />
                    {funding.rewardSelects.map((v, i) => {
                        const tempDescription = v.description.split("\n");
                        const isSelected = selectedRewards.find(r => r.index === i);
                        return (
                            <div
                                key={i}
                                onClick={() => handleSelectReward(v, i)}
                                className={`reward-item ${isSelected ? "selected" : ""}`}
                            >
                                <hr />
                                <h5>{v.title}</h5>
                                {tempDescription.map((t, idx) => <p key={idx}>{t}</p>)}
                                <h4>{v.price} ₩</h4>
                            </div>
                        );
                    })}

                    <button onClick={() => setModalVisible(true)}>후원하기</button>
                </aside>
            </div>

            {/* 후원 모달 */}
            <FundingDetailModal
                visible={modalVisible}
                selectedRewards={selectedRewards}
                onClose={() => setModalVisible(false)}
                onAddToCart={handleAddToCart}
                onDirectPayment={handleDirectPayment}
            />

            {/* 페이지 우측 따라다니는 TOP 버튼 */}
            {showTopButton && (
                <button className="scroll-top-btn-outside" onClick={scrollToTop}>
                    TOP
                </button>
            )}
        </div>
    );
}

export default FundingDetail;
