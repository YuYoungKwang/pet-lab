import { useParams, useNavigate, useOutletContext, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Stack } from "react-bootstrap";
import FundingHeader from "../../components/common/FundingHeader";
import "../../styles/Post.css";


export default function PostDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const category = location.state?.category ?? "free";
    const {
        posts = [],
        addComment,
        increaseView,
        funding,
        deletePost,
        deleteComment
    } = useOutletContext();
    const post = posts.find((p) => p.id === Number(id));
    const [comment, setComment] = useState("");

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const isLogin = !!loginUser; // 로그인 상태 확인

    // 🔹 로그인한 사용자 === 글 작성자 여부
    const isAuthor = isLogin && loginUser.id === post?.author;

    const handleEdit = () => {
        navigate(`../board/${category}/edit/${post.id}`, {
            state: { post }
        });
    };

    const handleDelete = () => {
        if (!window.confirm("정말로 삭제하시겠습니까?")) return;
        deletePost(post.id);
        alert("게시글이 삭제되었습니다.");
        navigate(`../board/${category}`);
    };

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

                    {isAuthor && (
                        <div className="post-action-buttons">
                            <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={handleEdit}
                            >
                                수정
                            </Button>
                            <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={handleDelete}
                            >
                                삭제
                            </Button>
                        </div>
                    )}
                </div>
                <div className="detail-content">{post.content}</div>


                <div className="comment-section">
                    {post.comments.length === 0 ? (
                    <p className="text-muted">아직 댓글이 없습니다.</p>
                ) : (
                    post.comments.map((c) => {
                        const isCommentAuthor =
                            isLogin && loginUser.id === c.author;

                        return (
                            <div key={c.id} className="comment">
                                <div className="comment-header">
                                    <div className="comment-info">
                                        <strong className="comment-author">{c.author}</strong>
                                        <span className="comment-date">{c.date}</span>
                                    </div>

                                    {/* ✅ 댓글 작성자만 삭제 가능 */}
                                    {isCommentAuthor && (
                                        <Button
                                            size="sm"
                                            variant="link"
                                            className="comment-delete"
                                            onClick={() => {
                                                if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
                                                deleteComment(post.id, c.id);
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    )}
                                </div>

                                <div className="comment-body">{c.text}</div>
                            </div>
                        );
                    })
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