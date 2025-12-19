import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Table, Button, ButtonGroup, Form, Card, Row, Col, Accordion } from "react-bootstrap";
import '../styles/Board.css';

export default function Board() {
    const navigate = useNavigate();
    const location = useLocation();

    // 1. 상태 관리
    const [myPosts, setMyPosts] = useState([]);
    const [myFundings, setMyFundings] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    
    // 모드 관리: my(관리 메인), write(쓰기/수정), detail(상세), faq(고객센터)
    const [viewMode, setViewMode] = useState("my"); 
    const [selectedPost, setSelectedPost] = useState(null);

    // 입력 필드 상태
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editPostId, setEditPostId] = useState(null);
    const [comment, setComment] = useState("");
    const [commentsList, setCommentsList] = useState([]);

    // 2. 초기 데이터 로드
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser") || localStorage.getItem("loginUser");
        const user = savedUser ? JSON.parse(savedUser) : null;
        
        if (!user) {
            alert("로그인이 필요한 페이지입니다.");
            navigate("/login");
            return;
        }
        setCurrentUser(user);

        const boardData = JSON.parse(localStorage.getItem("boardList")) || [];
        const savedFundings = JSON.parse(localStorage.getItem("myFundings")) || [];
        const allComments = JSON.parse(localStorage.getItem("boardComments")) || [];

        // 내가 쓴 글만 필터링하여 최신순 정렬
        setMyPosts(boardData.filter(p => p.writer === user.id).reverse());
        setMyFundings(savedFundings.filter(f => f.userId === user.id));
        setCommentsList(allComments);

        const queryParams = new URLSearchParams(location.search);
        const mode = queryParams.get("mode");
        if (mode) setViewMode(mode);
    }, [location.search, navigate]);

    // 3. 주요 기능 함수
    const handleShowDetail = (post) => {
        setSelectedPost(post);
        setViewMode("detail");
    };

    const handlePostSubmit = (e) => {
        e.preventDefault();
        const allPosts = JSON.parse(localStorage.getItem("boardList")) || [];

        if (editPostId) {
            const updated = allPosts.map(p => 
                p.id === editPostId ? { ...p, title, content, date: `${new Date().toLocaleDateString()} (수정됨)` } : p
            );
            localStorage.setItem("boardList", JSON.stringify(updated));
            alert("수정되었습니다.");
        } else {
            const newPost = { id: Date.now(), title, content, writer: currentUser.id, date: new Date().toLocaleDateString() };
            localStorage.setItem("boardList", JSON.stringify([...allPosts, newPost]));
            alert("등록되었습니다.");
        }
        window.location.reload();
    };

    const handlePostDelete = (id) => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            const allPosts = JSON.parse(localStorage.getItem("boardList")) || [];
            localStorage.setItem("boardList", JSON.stringify(allPosts.filter(p => p.id !== id)));
            window.location.reload();
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if(!comment.trim()) return;
        
        const newComment = {
            id: Date.now(),
            postId: selectedPost.id,
            writer: currentUser.id,
            content: comment,
            date: new Date().toLocaleString()
        };
        
        const updatedComments = [...commentsList, newComment];
        localStorage.setItem("boardComments", JSON.stringify(updatedComments));
        setCommentsList(updatedComments);
        setComment("");
    };

    const handleCommentDelete = (commentId) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            const updated = commentsList.filter(c => c.id !== commentId);
            localStorage.setItem("boardComments", JSON.stringify(updated));
            setCommentsList(updated);
        }
    };

    return (
        <Container className="board-page-container mt-5">
            <div className="text-center mb-5">
                <h2 className="fw-bold">게시물 관리</h2>
                <p className="text-muted">고객님께서 작성하신 게시물을 관리하는 공간입니다.</p>
            </div>

            {/* 탭 메뉴 */}
            <ButtonGroup className="mb-5 w-100 shadow-sm custom-tabs">
                <Button variant={viewMode === "my" || viewMode === "detail" || viewMode === "write" ? "dark" : "outline-dark"} onClick={() => setViewMode("my")}>내 활동 관리</Button>
                <Button variant={viewMode === "faq" ? "dark" : "outline-dark"} onClick={() => setViewMode("faq")}>고객센터 FAQ</Button>
            </ButtonGroup>

            {/* --- 1. 내 활동 관리 (메인) --- */}
            {viewMode === "my" && (
                <div className="my-activity-section">
                    <section className="mb-5">
                        <h5 className="fw-bold mb-3 border-start border-4 border-primary ps-3">등록한 펀딩</h5>
                        <div className="p-4 bg-light rounded border">
                            {myFundings.length > 0 ? (
                                <Row>{myFundings.map(f => <Col md={4} key={f.id} className="mb-2"><Card className="p-3 border-0 shadow-sm">{f.title}</Card></Col>)}</Row>
                            ) : <p className="text-center text-muted m-0 py-4">참여한 내역이 없습니다.</p>}
                        </div>
                    </section>
{/* 
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold m-0 border-start border-4 border-primary ps-3">작성한 게시물</h5>
                        <Button variant="primary" size="sm" onClick={() => setViewMode("write")}>새 글 작성</Button>
                    </div> */}
                    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                        <Table hover borderless className="mb-0 text-center">
                            <thead className="bg-light border-bottom">
                                <tr><th style={{width:'70%'}}>제목</th><th>날짜</th><th>관리</th></tr>
                            </thead>
                            <tbody>
                                {myPosts.map(post => (
                                    <tr key={post.id} className="border-bottom align-middle">
                                        <td className="ps-4 py-3 text-start fw-bold" onClick={() => handleShowDetail(post)} style={{cursor:'pointer'}}>{post.title}</td>
                                        <td className="py-3 text-muted" style={{fontSize: '0.9rem'}}>{post.date}</td>
                                        <td className="py-3">
                                            <Button variant="outline-primary" size="sm" className="me-2" onClick={() => { setEditPostId(post.id); setTitle(post.title); setContent(post.content); setViewMode("write"); }}>수정</Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => handlePostDelete(post.id)}>삭제</Button>
                                        </td>
                                    </tr>
                                ))}
                                {myPosts.length === 0 && <tr><td colSpan="3" className="text-center py-5 text-muted">작성한 게시물이 없습니다.</td></tr>}
                            </tbody>
                        </Table>
                    </Card>
                </div>
            )}

            {/* --- 2. 게시글 상세보기 및 댓글 삭제 --- */}
            {viewMode === "detail" && selectedPost && (
                <Card className="detail-view-card border-0 shadow-sm mb-5">
                    <Card.Body className="p-5">
                        <div className="mb-4">
                            <Button variant="link" className="p-0 text-decoration-none text-muted" onClick={() => setViewMode("my")}>← 목록으로 돌아가기</Button>
                        </div>
                        <h2 className="fw-bold mb-3">{selectedPost.title}</h2>
                        <div className="text-muted border-bottom pb-3 mb-4">작성일: {selectedPost.date}</div>
                        <div className="post-body-text py-3 mb-5" style={{ minHeight: '250px', fontSize: '1.15rem', whiteSpace: 'pre-wrap' }}>
                            {selectedPost.content}
                        </div>
                        
                        {/* 댓글 섹션 */}
                        <div className="comment-section bg-light p-4 rounded-4">
                            <h6 className="fw-bold mb-3">댓글 {commentsList.filter(c => c.postId === selectedPost.id).length}</h6>
                            <Form onSubmit={handleCommentSubmit} className="mb-4">
                                <div className="d-flex gap-2">
                                    <Form.Control placeholder="댓글을 입력해주세요." value={comment} onChange={(e)=>setComment(e.target.value)} />
                                    <Button variant="dark" type="submit" style={{width:'100px'}}>등록</Button>
                                </div>
                            </Form>
                            <div className="comments-list">
                                {commentsList.filter(c => c.postId === selectedPost.id).map(c => (
                                    <div key={c.id} className="pb-3 mb-3 border-bottom">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                            <div>
                                                <small className="fw-bold me-2">{c.writer}</small>
                                                <small className="text-muted" style={{fontSize:'0.75rem'}}>{c.date}</small>
                                            </div>
                                            {currentUser && c.writer === currentUser.id && (
                                                <Button variant="link" className="text-danger p-0 ms-2" style={{fontSize:'0.8rem', textDecoration:'none'}} onClick={() => handleCommentDelete(c.id)}>삭제</Button>
                                            )}
                                        </div>
                                        <p className="m-0" style={{fontSize:'0.95rem', color: '#444'}}>{c.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            )}

            {/* --- 3. FAQ (질문 추가 버전) --- */}
            {viewMode === "faq" && (
                <div className="faq-section">
                    <h4 className="fw-bold mb-4">자주 묻는 질문 (FAQ)</h4>
                    <Accordion defaultActiveKey="0" className="shadow-sm">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>펀딩 취소 및 환불 규정이 어떻게 되나요?</Accordion.Header>
                            <Accordion.Body>펀딩 결제 취소는 프로젝트 종료 전까지만 가능합니다. 마감 후에는 제작 단계로 넘어가므로 단순 변심 환불이 불가합니다.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>배송지 변경은 어디서 하나요?</Accordion.Header>
                            <Accordion.Body>[내 활동 관리] 탭에서 참여한 펀딩을 클릭하여 배송 전 단계일 때 직접 수정이 가능합니다.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>게시글 수정/삭제가 안 됩니다.</Accordion.Header>
                            <Accordion.Body>본인이 작성한 글만 수정 및 삭제가 가능합니다. 로그인 상태를 다시 한 번 확인해 주세요.</Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>리워드 상품에 하자가 있을 때는?</Accordion.Header>
                            <Accordion.Body>수령 후 7일 이내에 하자 사진과 함께 1:1 문의를 주시면 빠른 교환 처리를 도와드립니다.</Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
            )}

            {/* --- 4. 글쓰기/수정 --- */}
            {viewMode === "write" && (
                <Card className="border-0 shadow-sm">
                    <Card.Body className="p-5">
                        <h4 className="fw-bold mb-4 text-center">{editPostId ? "내용 수정" : "새 게시글 작성"}</h4>
                        <Form onSubmit={handlePostSubmit}>
                            <Form.Control size="lg" className="mb-3" type="text" placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)} required />
                            <Form.Control as="textarea" rows={15} className="mb-4" placeholder="내용을 입력하세요" value={content} onChange={(e)=>setContent(e.target.value)} required />
                            <div className="d-flex justify-content-center gap-3">
                                <Button variant="secondary" className="px-5" onClick={() => setViewMode("my")}>취소</Button>
                                <Button variant="primary" className="px-5" type="submit">저장하기</Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}