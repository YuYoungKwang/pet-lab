import { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function SignUpPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        id: "",
        password: "",
        passwordCheck: "",
        name: "",
        email: "",
        phone1: "010",
        phone2: "",
        phone3: "",
        zipcode: "",
        addr1: "",
        addr2: "",
        favorites: [],
        cart: [],
        orders: [],
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;

        // 비밀번호와 비밀번호 확인 칸에서 공백 제거
        if (name === 'password' || name === 'passwordCheck') {
            finalValue = value.replace(/\s/g, '');
        }
        // 전화번호 칸(phone2, phone3)에서 숫자만 입력되도록 제한
        if (name === 'phone2' || name === 'phone3') {
            finalValue = value.replace(/[^0-9]/g, '');
        }

        setForm({ ...form, [name]: finalValue });
    };

    const submit = () => {
        // 1. 필수 항목 입력 여부 확인
        if (!form.id || !form.password || !form.name || !form.email || !form.phone2 || !form.phone3) {
            alert("필수 항목을 모두 입력하세요 (전화번호 포함)");
            return;
        }

        // 공통 정규식: 영문과 숫자가 최소 하나씩 포함되어 있는지 확인
        const comboCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).+$/;

        // 2. 아이디 유효성 검사 (8~20자, 영문+숫자 조합 필수)
        const idCharCheck = /^[a-zA-Z0-9]+$/;
        if (form.id.length < 8 || form.id.length > 20 || !comboCheck.test(form.id) || !idCharCheck.test(form.id)) {
            alert("아이디는 영문과 숫자를 조합하여 8~20자로 입력해야 합니다 (한글/특수문자 불가)");
            return;
        }

        // 3. [수정된 부분] 비밀번호 유효성 검사 (8~20자, 영문+숫자 조합 필수)
        if (form.password.length < 8 || form.password.length > 20) {
            alert("비밀번호는 8자 이상 20자 이하로 입력하세요");
            return;
        }
        
        // 비밀번호 조합 체크 추가
        if (!comboCheck.test(form.password)) {
            alert("비밀번호는 영문과 숫자를 반드시 조헙해서 사용해야 합니다");
            return;
        }

        if (form.password !== form.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

        // 4. 이메일 형식 검사 (기존 유지)
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(form.email)) {
            alert("올바른 이메일 형식이 아닙니다 (예: abc@example.com)");
            return;
        }

        // 5. 전화번호 길이 검사 (기존 유지)
        if (form.phone2.length < 3 || form.phone3.length !== 4) {
            alert("전화번호 형식이 올바르지 않습니다");
            return;
        }

        // 저장 로직
        const newUser = {
            id: form.id,
            password: form.password,
            name: form.name,
            email: form.email,
            phone: `${form.phone1}-${form.phone2}-${form.phone3}`,
            address: {
                zipcode: form.zipcode,
                addr1: form.addr1,
                addr2: form.addr2,
            },
            favorites: [],      // 좋아요한 펀딩 ID 배열
            cart: [],           // 장바구니: { fundingId, quantity }
            orders: [],         // 주문내역: { orderId, items: [{fundingId, quantity}], totalAmount, status, orderDate }
        };

        const users = JSON.parse(localStorage.getItem("회원정보")) || [];
        const exists = users.some((user) => user.id === form.id);
        
        if (exists) {
            alert("이미 사용 중인 아이디입니다");
            return;
        }

        users.push(newUser);
        localStorage.setItem("회원정보", JSON.stringify(users));

        alert("회원가입 완료!");
        navigate("/login");
    };

    return (
        <Container className="mt-4" style={{ maxWidth: 700 }}>
            <h4 className="mb-3">회원가입</h4>
            <Card>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>아이디 * (8~20자, 영문+숫자 조합)</Form.Label>
                            <Form.Control 
                                name="id" 
                                value={form.id} 
                                onChange={onChange} 
                                placeholder="영문과 숫자를 조합해서 입력하세요"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>비밀번호 * (8~20자, 영문+숫자 조합)</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                placeholder="8~20자 영문/숫자 조합"
                                maxLength={20}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>비밀번호 확인 *</Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordCheck"
                                value={form.passwordCheck}
                                onChange={onChange}
                                placeholder="비밀번호 재입력"
                                maxLength={20}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>이름 *</Form.Label>
                            <Form.Control name="name" value={form.name} onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>이메일 *</Form.Label>
                            <Form.Control 
                                name="email" 
                                value={form.email} 
                                onChange={onChange} 
                                placeholder="example@email.com"
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>주소</Form.Label>
                            <Row className="mb-2">
                                <Col xs={4}>
                                    <Form.Control placeholder="우편번호" name="zipcode" value={form.zipcode} onChange={onChange} />
                                </Col>
                            </Row>
                            <Form.Control className="mb-2" placeholder="기본 주소" name="addr1" value={form.addr1} onChange={onChange} />
                            <Form.Control placeholder="상세 주소" name="addr2" value={form.addr2} onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>전화번호 *</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control name="phone1" value={form.phone1} onChange={onChange} />
                                </Col>
                                <Col>
                                    <Form.Control name="phone2" value={form.phone2} onChange={onChange} maxLength={4} placeholder="1234" />
                                </Col>
                                <Col>
                                    <Form.Control name="phone3" value={form.phone3} onChange={onChange} maxLength={4} placeholder="5678" />
                                </Col>
                            </Row>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => navigate(-1)}>취소</Button>
                            <Button onClick={submit}>회원가입</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}