import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Stack } from "react-bootstrap";

export default function PostEditPage() {
    const { id, category } = useParams();
    const navigate = useNavigate();
    const { posts, updatePost } = useOutletContext();

    const post = posts.find(p => p.id === Number(id));
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!post) return;

        // 🔐 권한 체크
        if (loginUser?.id !== post.author) {
            alert("수정 권한이 없습니다.");
            navigate(-1);
            return;
        }

        setTitle(post.title);
        setContent(post.content);
    }, [post]);

    if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

    const handleSubmit = () => {
        if (!title || !content) {
            alert("제목과 내용을 입력하세요.");
            return;
        }

        const success = updatePost(post.id, { title, content });
        if (!success) return;
        alert("게시글이 수정되었습니다.");
        navigate(`../post/${post.id}`);
    };

    return (
        <Container className="mt-4">
            <Card className="p-3">
                <h4>게시글 수정</h4>

                <Form.Control
                    className="mt-2"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Form.Control
                    as="textarea"
                    rows={6}
                    className="mt-2"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Stack direction="horizontal" gap={2} className="mt-3">
                    <Button onClick={handleSubmit}>수정완료</Button>
                    <Button
                        variant="secondary"
                        onClick={() => navigate(-1)}
                    >
                        취소
                    </Button>
                </Stack>
            </Card>
        </Container>
    );
}
