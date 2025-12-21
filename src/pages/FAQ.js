import React from "react";
import { Container, Accordion, Card } from "react-bootstrap";
import '../styles/FAQ.css';

export default function FAQ() {
    const faqData = [
        {
            question: "펀딩 취소 및 환불 규정이 어떻게 되나요?",
            answer: "펀딩 결제 취소는 프로젝트 종료 전까지만 가능합니다. 마감 후에는 제작 단계로 넘어가므로 단순 변심 환불이 불가합니다."
        },
        {
            question: "배송지 변경은 어디서 하나요?",
            answer: "[내 활동 관리] 탭에서 참여한 펀딩을 클릭하여 배송 전 단계일 때 직접 수정이 가능합니다."
        },
        {
            question: "게시글 수정/삭제가 안 됩니다.",
            answer: "본인이 작성한 글만 수정 및 삭제가 가능합니다. 로그인 상태를 다시 한 번 확인해 주세요."
        },
        {
            question: "리워드 상품에 하자가 있을 때는?",
            answer: "수령 후 7일 이내에 하자 사진과 함께 1:1 문의를 주시면 빠른 교환 처리를 도와드립니다."
        },
        {
            question: "계정 정보는 어떻게 수정하나요?",
            answer: "[내 계정] 페이지에서 이름, 이메일, 비밀번호 등 개인정보를 수정할 수 있습니다."
        },
        {
            question: "비밀번호를 잊어버렸어요.",
            answer: "로그인 페이지의 '비밀번호 찾기'를 통해 이메일 인증 후 새 비밀번호를 설정할 수 있습니다."
        },
        {
            question: "펀딩 참여 후 결제 내역을 확인하고 싶어요.",
            answer: "[내 활동 관리] → [참여한 펀딩]에서 각 프로젝트의 결제 내역과 상태를 확인할 수 있습니다."
        },
        {
            question: "펀딩 진행 상황을 알 수 있나요?",
            answer: "각 프로젝트 상세 페이지에서 현재 모금액, 참여자 수, 남은 기간 등 진행 상황을 실시간으로 확인할 수 있습니다."
        },
        {
            question: "댓글이나 게시글 작성이 제한될 수 있나요?",
            answer: "서비스 이용 규정을 위반한 경우 작성 제한이 될 수 있습니다. 자세한 내용은 [이용약관]을 확인해주세요."
        },
        {
            question: "1:1 문의는 어떻게 하나요?",
            answer: "[고객센터] 페이지에서 문의 등록 후 담당자가 확인하여 이메일 또는 메시지로 답변을 드립니다."
        },
        {
            question: "펀딩 프로젝트가 목표 금액을 달성하지 못하면 어떻게 되나요?",
            answer: "목표 금액 미달 시 결제는 자동으로 취소되고, 결제 금액은 전액 환불됩니다."
        },
        {
            question: "펀딩 리워드를 다른 사람에게 배송할 수 있나요?",
            answer: "배송지는 주문 시 등록된 주소로만 발송됩니다. 타인에게 배송을 원할 경우 주소를 직접 수정해주세요."
        },
        {
            question: "펀딩 참여 후 참여 취소가 가능한가요?",
            answer: "프로젝트 종료 전까지만 참여 취소가 가능합니다. 종료 후에는 제작 단계로 넘어가므로 취소가 불가합니다."
        },
        {
            question: "펀딩 프로젝트를 추천하고 싶어요.",
            answer: "각 프로젝트 상세 페이지에서 SNS 공유 버튼을 통해 친구나 지인에게 추천할 수 있습니다."
        }
    ];

    return (
        <Container className="faq-page-container mt-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">자주 묻는 질문 (FAQ)</h2>
                <p className="text-muted">회원님들이 자주 문의하시는 질문들을 모아놓았습니다.</p>
            </div>

            <Accordion defaultActiveKey="0">
                {faqData.map((item, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>{item.question}</Accordion.Header>
                        <Accordion.Body>{item.answer}</Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
}
