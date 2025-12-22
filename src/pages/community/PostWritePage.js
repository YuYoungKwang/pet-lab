import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Card, Form, Button, Stack } from "react-bootstrap";


export default function PostWritePage() {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("free");
    const navigate = useNavigate();

    const { createPost } = useOutletContext();


    const submit = () => {
        const success = createPost({ title, content, category });
        if (!success) return;
        navigate(`../board/${category}`);
    };


    return (
        <Container className="community-container">
            <h2 className="community-title">글 작성</h2>
            <Card className="community-card">
                <Form>
                    <Form.Select
                        className="mb-2"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="free">자유</option>
                        <option value="info">정보공유</option>
                        <option value="qna">질문 / 답변</option>
                        <option value="feedback">피드백</option>
                    </Form.Select> 

                    <Form.Control
                        className="mb-2"
                        placeholder="제목"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="내용"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <Stack direction="horizontal" gap={2} className="mt-3">
                        <Button variant="secondary" onClick={() => navigate(`../board/${category}`)}>취소</Button>
                        <Button onClick={submit}>등록</Button>
                    </Stack>
                </Form>
            </Card>
        </Container>
    );
}