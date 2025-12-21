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
            const updatedItems = order.items.map(item => {
                if (!item.fundingId) return { ...item, status: order.status || "결제완료" };

                const funding = fundingList.find(f => f.id === item.fundingId);
                if (!funding) return { ...item, status: order.status || "결제완료" };

                // 상태 계산
                const paymentTime = new Date(funding.paymentDate);
                const deliveryTime = new Date(funding.expectedDeliveryDate);
                let status = "주문완료";
                if (now >= paymentTime) status = "결제완료";
                if (now >= deliveryTime) status = "배송중";

                const deliveryCompleteTime = new Date(deliveryTime);
                deliveryCompleteTime.setDate(deliveryCompleteTime.getDate() + 2);
                if (now >= deliveryCompleteTime) status = "배송완료";
                console.log(funding.thumbnailImage);
                return {
                    ...item,
                    status,
                    image: "/images/funding/" + funding.thumbnailImage
                };
            });

            // 주문 상태: 아이템 상태 중 가장 진행된 것으로 표시
            const itemStatuses = updatedItems.map(item => item.status);
            const orderStatus = itemStatuses.includes("배송완료")
                ? "배송완료"
                : itemStatuses.includes("배송중")
                    ? "배송중"
                    : itemStatuses.includes("결제완료")
                        ? "결제완료"
                        : "주문완료";
            console.log(updatedItems)
            return { ...order, items: updatedItems, status: orderStatus };
        });

        setOrders(updatedOrders);
    }, [loginUser]);

    if (!loginUser) return <p>로그인이 필요합니다.</p>;

    return (
        <div className="order-page">
            <h1>결제 내역</h1>
            {orders.length === 0 ? (
                <p>결제한 내역이 없습니다.</p>
            ) : (
                orders.map(order => (
                    <div className="order-card" key={order.orderId} onClick={()=>navigate('/fundingDetail/'+order.items[0].fundingId)}>
                        <div className="order-header">
                            <div className="order-info">
                                {order.items[0].image && (
                                    <img
                                        src={order.items[0].image}
                                        alt="펀딩 이미지"
                                        className="order-img"
                                    />
                                )}
                                <div className="order-text">
                                    <h3>주문번호: {order.orderId}</h3>
                                    <p>주문일: {new Date(order.orderDate).toLocaleString()}</p>
                                </div>
                            </div>
                            <span className={`order-status ${order.status.replace(" ", "-")}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="order-items">
                            {order.items.map((item, idx) => (
                                <div key={idx} className="order-item">
                                    <p>리워드: {item.title || "알 수 없는 리워드"}</p>
                                    {item.fundingId && <p>펀딩ID: {item.fundingId}</p>}
                                    <p>가격: {(item.price || 0).toLocaleString()} ₩</p>
                                    <p>수량: {item.quantity}</p>
                                    <p>총액: {(item.price * item.quantity || 0).toLocaleString()} ₩</p>
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
