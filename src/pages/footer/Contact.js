
function Contact() {
    return (
        <div>
            <h1>고객센터</h1>

            <section>
                <h2>1. 문의 안내</h2>
                <p>
                    펫랩 서비스 이용 중 궁금한 사항이나 불편 사항이 있을 경우 아래 방법으로 문의하실 수 있습니다.
                </p>
                <ul>
                    <li>이메일: support@petlab.com</li>
                    <li>전화: 02-1234-5678 (평일 09:00 ~ 18:00)</li>
                    <li>1:1 문의: 홈페이지 내 '문의하기' 메뉴 이용</li>
                </ul>
            </section>

            <section>
                <h2>2. 자주 묻는 질문(FAQ)</h2>
                <ul>
                    <li><strong>Q:</strong> 펀딩 취소는 어떻게 하나요?<br />
                        <strong>A:</strong> 마이페이지 → 펀딩 내역에서 취소 요청 가능합니다.</li>
                    <li><strong>Q:</strong> 결제 후 환불은 언제 처리되나요?<br />
                        <strong>A:</strong> 펀딩 목표 미달 시 자동 환불, 단일 상품 환불은 요청 후 3~5일 내 처리됩니다.</li>
                    <li><strong>Q:</strong> 배송이 늦어질 경우 어떻게 확인하나요?<br />
                        <strong>A:</strong> 펀딩 내역 및 배송 추적을 통해 확인 가능합니다.</li>
                </ul>
            </section>

            <section>
                <h2>3. 건의 및 제안</h2>
                <p>
                    서비스 개선, 기능 제안, 반려동물 관련 아이디어는 1:1 문의 또는 이메일로 접수 가능합니다.
                    모든 의견은 검토 후 서비스 개선에 반영됩니다.
                </p>
            </section>

            <section>
                <h2>4. 처리 기간 안내</h2>
                <p>
                    접수된 문의는 최대 3영업일 내 처리하며, 필요 시 추가 안내를 드립니다.
                </p>
            </section>

            <section>
                <h2>5. 고객센터 운영 정책</h2>
                <ul>
                    <li>영업시간: 평일 09:00 ~ 18:00</li>
                    <li>점심시간: 12:00 ~ 13:00 (문의 응답 지연 가능)</li>
                    <li>주말/공휴일 문의: 다음 영업일 처리</li>
                </ul>
            </section>
        </div>
    );
}

export default Contact;
