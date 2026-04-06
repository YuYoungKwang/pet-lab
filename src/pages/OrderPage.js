// OrderPage.js
import { useEffect, useState } from "react";
import "../styles/OrderPage.css";
import { useNavigate } from "react-router";

function OrderPage({ loginUser }) {
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loginUser) return;

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const fundingList = JSON.parse(localStorage.getItem("fundingList")) || [];
        const member = members.find(m => m.id === loginUser.id);
        if (!member || !member.orders) return;

        const now = new Date();

        const updatedOrders = member.orders.map(order => {
            // 🔴 이미 취소된 주문은 그대로 유지
            if (order.status === "취소됨") return order;

            const updatedItems = order.items.map(item => {
                if (!item.fundingId) {
                    return { ...item, status: order.status || "결제완료" };
                }

                const funding = fundingList.find(f => f.id === item.fundingId);
                if (!funding) {
                    return { ...item, status: order.status || "결제완료" };
                }

                const paymentTime = new Date(funding.paymentDate);
                const deliveryTime = new Date(funding.expectedDeliveryDate);

                let status = "주문완료";
                if (now >= paymentTime) status = "결제완료";
                if (now >= deliveryTime) status = "배송중";

                const deliveryCompleteTime = new Date(deliveryTime);
                deliveryCompleteTime.setDate(deliveryCompleteTime.getDate() + 2);
                if (now >= deliveryCompleteTime) status = "배송완료";

                return {
                    ...item,
                    status,
                    image: `${process.env.PUBLIC_URL}/images/funding/${funding.thumbnailImage}`
                };
            });

            const itemStatuses = updatedItems.map(i => i.status);
            const orderStatus = itemStatuses.includes("배송완료")
                ? "배송완료"
                : itemStatuses.includes("배송중")
                    ? "배송중"
                    : itemStatuses.includes("결제완료")
                        ? "결제완료"
                        : "주문완료";

            return { ...order, items: updatedItems, status: orderStatus };
        });

        setOrders(updatedOrders);
    }, [loginUser]);

    // ✅ 주문 취소
    const handleCancelOrder = (e, orderId) => {
        e.stopPropagation();

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const fundingList = JSON.parse(localStorage.getItem("fundingList")) || [];

        const memberIndex = members.findIndex(m => m.id === loginUser.id);
        if (memberIndex === -1) return;

        const member = members[memberIndex];
        const order = member.orders.find(o => o.orderId === orderId);
        if (!order) return;

        if (["배송중", "배송완료", "취소됨"].includes(order.status)) {
            alert("배송이 시작된 주문은 취소할 수 없습니다.");
            return;
        }

        if (!window.confirm("주문을 취소하시겠습니까?")) return;

        // 🔽 펀딩 금액 복구
        order.items.forEach(item => {
            const fundingIndex = fundingList.findIndex(f => f.id === item.fundingId);
            if (fundingIndex !== -1) {
                fundingList[fundingIndex].currentAmount -=
                    (item.price || 0) * item.quantity;

                if (fundingList[fundingIndex].currentAmount < 0) {
                    fundingList[fundingIndex].currentAmount = 0;
                }
            }
        });

        // 🔴 상태 변경
        order.status = "취소됨";

        localStorage.setItem("회원정보", JSON.stringify(members));
        localStorage.setItem("fundingList", JSON.stringify(fundingList));

        setOrders(prev =>
            prev.map(o =>
                o.orderId === orderId ? { ...o, status: "취소됨" } : o
            )
        );

        alert("주문이 취소되었습니다.");
    };

    if (!loginUser) return <p>로그인이 필요합니다.</p>;

    return (
        <div className="order-page">
            <h1>주문 내역</h1>

            {orders.length === 0 ? (
                <p>주문한 내역이 없습니다.</p>
            ) : (
                orders.map(order => (
                    <div
                        className="order-card"
                        key={order.orderId}
                        onClick={() =>
                            order.items[0]?.fundingId &&
                            navigate(`/fundingDetail/${order.items[0].fundingId}`)
                        }
                    >
                        {/* 헤더 */}
                        <div className="order-header">
                            <div className="order-info">
                                {order.items[0]?.image && (
                                    <img
                                        src={order.items[0].image}
                                        alt="펀딩 썸네일"
                                        className="order-img"
                                    />
                                )}

                                <div className="order-text">
                                    <h3>주문번호: {order.orderId}</h3>
                                    <p>주문일: {new Date(order.orderDate).toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="order-info-right">
                                <span className={`order-status ${order.status}`}>
                                    {order.status}
                                </span>

                                {!["배송중", "배송완료", "취소됨"].includes(order.status) && (
                                    <button
                                        className="order-cancle-button"
                                        onClick={(e) =>
                                            handleCancelOrder(e, order.orderId)
                                        }
                                    >
                                        주문 취소
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* 아이템 */}
                        <div className="order-items">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <p>리워드: {item.title}</p>
                                    <p>가격: {item.price.toLocaleString()} ₩</p>
                                    <p>수량: {item.quantity}</p>
                                    <p>
                                        합계: {(item.price * item.quantity).toLocaleString()} ₩
                                    </p>
                                </div>
                            ))}
                        </div>

                        <h4 className="order-total">
                            총 결제 금액: {order.totalAmount.toLocaleString()} ₩
                        </h4>
                    </div>
                ))
            )}
        </div>
    );
}

export default OrderPage;
