import { useParams, useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Stack } from "react-bootstrap";
import FundingHeader from "../../components/common/FundingHeader";
import "../../styles/Comment.css";


export default function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category ?? "free";
    const { posts = [], addComment, increaseView, funding } = useOutletContext();
    const post = posts.find((p) => p.id === Number(id));
    const [comment, setComment] = useState("");

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const isLogin = !!loginUser; // 로그인 상태 확인


    useEffect(() => {
        if (post) increaseView(post.id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    if (!post) {
        return (
            <Container className="mt-4 text-center">
                <p>게시글을 찾을 수 없습니다.</p>
                <Button onClick={() => navigate("../board/free")}>
                    목록으로
                </Button>
            </Container>
        );
    }


    return (
        <Container className="community-container">
            {funding && <FundingHeader funding={funding} />}
            <Card className="community-card">
                <div className="detail-header">
                    <strong>{post.title}</strong>
                    <span>조회 {post.views}</span>
                </div>
                <div className="detail-content">{post.content}</div>


                <div className="comment-section">
                    {console.log("comments:", post.comments)}
                    {post.comments.length === 0 ? (
                        <p className="text-muted">아직 댓글이 없습니다.</p>
                    ) : (
                        post.comments.map((c) => (
                            <div key={c.id} className="comment">
                                <div className="comment-header">
                                    <strong className="comment-author">{c.author}</strong>
                                    <span className="comment-date">{c.date}</span>
                                </div>
                                <div className="comment-body">
                                    {c.text}
                                </div>
                            </div>
                        ))
                    )}

                    <Form.Control
                        className="mt-2"
                        placeholder={
                            isLogin ? "댓글을 입력하세요" : "로그인 후 댓글 작성이 가능합니다"
                        }
                        value={comment}
                        disabled={!isLogin}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Stack direction="horizontal" gap={2} className="mt-2">
                        <Button
                            size="sm"
                            onClick={() => {
                            if (!comment) return;
                            addComment(post.id, comment);
                            setComment("");
                            }}
                        >등록</Button>
                        <Button size="sm" variant="outline-secondary" onClick={() => navigate(`../board/${category}`)}>목록</Button>
                    </Stack>
                </div>
            </Card>
        </Container>
    );
}