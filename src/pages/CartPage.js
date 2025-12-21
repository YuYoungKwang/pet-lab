import { useState, useEffect } from "react";
import "../styles/CartPage.css";

function CartPage({ loginUser }) {
    const [cartItems, setCartItems] = useState([]);
    const [fundingList, setFundingList] = useState([]);

    // 초기 cart 데이터 로드 및 fundingList 로드
    useEffect(() => {
        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const member = members.find(m => m.id === loginUser.id);
        if (member) setCartItems(member.cart || []);

        const fundings = JSON.parse(localStorage.getItem("fundingList")) || [];
        setFundingList(fundings);
    }, [loginUser]);

    // CartItem 수량 업데이트
    const updateQuantity = (index, delta) => {
        setCartItems(prev =>
            prev.map((item, i) =>
                i === index ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
            )
        );

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const memberIndex = members.findIndex(m => m.id === loginUser.id);
        if (memberIndex !== -1) {
            members[memberIndex].cart[index].quantity = Math.max(1, cartItems[index].quantity + delta);
            localStorage.setItem("회원정보", JSON.stringify(members));
        }
    };

    // CartItem 삭제
    const removeItem = (index) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1);
        setCartItems(updatedCart);

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const memberIndex = members.findIndex(m => m.id === loginUser.id);
        if (memberIndex !== -1) {
            members[memberIndex].cart = updatedCart;
            localStorage.setItem("회원정보", JSON.stringify(members));
        }
    };

    const totalAmount = cartItems.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    // 결제 처리
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("장바구니가 비어있습니다.");
            return;
        }

        const members = JSON.parse(localStorage.getItem("회원정보")) || [];
        const memberIndex = members.findIndex(m => m.id === loginUser.id);
        if (memberIndex === -1) return;

        const order = {
            orderId: "order_" + new Date().getTime(),
            items: cartItems.map((item) => ({
                fundingId: item.fundingId,
                rewardIndex: item.rewardIndex,
                title: item.title,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount,
            status: "결제완료",
            orderDate: new Date().toISOString()
        };

        // 회원 주문 추가
        members[memberIndex].orders = members[memberIndex].orders || [];
        members[memberIndex].orders.push(order);

        // 펀딩 currentAmount 업데이트
        const fundingListUpdated = [...fundingList];
        cartItems.forEach(item => {
            const fundingIndex = fundingListUpdated.findIndex(f => f.id === item.fundingId);
            if (fundingIndex !== -1) {
                fundingListUpdated[fundingIndex].currentAmount += (item.price || 0) * item.quantity;
            }
        });

        setFundingList(fundingListUpdated);
        localStorage.setItem("fundingList", JSON.stringify(fundingListUpdated));

        // 장바구니 비우기
        members[memberIndex].cart = [];
        setCartItems([]);

        localStorage.setItem("회원정보", JSON.stringify(members));
        alert("결제가 완료되었습니다!");
    };

    return (
        <div className="cart-page">
            <h1>장바구니</h1>
            {cartItems.length === 0 ? (
                <p>장바구니가 비어있습니다.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map((item, index) => {
                            // fundingList에서 이미지 가져오기
                            const funding = fundingList.find(f => f.id === item.fundingId);
                            const thumbnailImage = funding?.thumbnailImage;

                            return (
                                <div key={index} className="cart-item">
                                    {thumbnailImage && (
                                        <img
                                            src={'images/funding/'+thumbnailImage}
                                            alt="리워드 이미지"
                                            className="cart-item-img"
                                        />
                                    )}
                                    <div className="cart-item-info">
                                        <h4>{item.title || "알 수 없는 리워드"}</h4>
                                        {item.description && <p>{item.description}</p>}
                                        <p>가격: {item.price ? item.price.toLocaleString() : 0} ₩</p>
                                        <div className="quantity-control">
                                            <button onClick={() => updateQuantity(index, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(index, 1)}>+</button>
                                            <button onClick={() => removeItem(index)}>삭제</button>
                                        </div>
                                        <p>총액: {(item.price || 0) * item.quantity} ₩</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="cart-total">
                        <h3>총 결제 금액: {totalAmount.toLocaleString()} ₩</h3>
                        <button className="checkout-btn" onClick={handleCheckout}>결제하기</button>
                    </div>
                </>
            )}
        </div>
    );
}

export default CartPage;
