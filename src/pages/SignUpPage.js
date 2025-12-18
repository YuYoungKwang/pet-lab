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
        favorites: [],      // 좋아요한 펀딩 ID 배열
        cart: [],           // 장바구니: { fundingId, quantity }
        orders: [],         // 주문내역: { orderId, items: [{fundingId, quantity}], totalAmount, status, orderDate }
    });

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const submit = () => {
        if (!form.id || !form.password || !form.name || !form.email) {
            alert("필수 항목을 입력하세요");
            return;
        }

        if (form.password !== form.passwordCheck) {
            alert("비밀번호가 일치하지 않습니다");
            return;
        }

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
                            <Form.Label>아이디 *</Form.Label>
                            <Form.Control name="id" onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>비밀번호 *</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>비밀번호 확인 *</Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordCheck"
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>이름 *</Form.Label>
                            <Form.Control name="name" onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>이메일 *</Form.Label>
                            <Form.Control name="email" onChange={onChange} />
                        </Form.Group>

                        <Form.Group className="mb-2">
                            <Form.Label>주소</Form.Label>
                            <Row className="mb-2">
                                <Col>
                                    <Form.Control
                                        placeholder="우편번호"
                                        name="zipcode"
                                        onChange={onChange}
                                    />
                                </Col>
                            </Row>
                            <Form.Control
                                className="mb-2"
                                placeholder="기본 주소"
                                name="addr1"
                                onChange={onChange}
                            />
                            <Form.Control
                                placeholder="상세 주소"
                                name="addr2"
                                onChange={onChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>전화번호</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control
                                        name="phone1"
                                        value={form.phone1}
                                        onChange={onChange}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control name="phone2" onChange={onChange} />
                                </Col>
                                <Col>
                                    <Form.Control name="phone3" onChange={onChange} />
                                </Col>
                            </Row>
                        </Form.Group>

                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={() => navigate(-1)}>
                                취소
                            </Button>
                            <Button onClick={submit}>회원가입</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
