import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Table, Button, ButtonGroup, Card } from "react-bootstrap";
import FundingCard from "../components/common/FundingCard";
import '../styles/Board.css';

export default function Board({ loginUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    // 상태 관리
    const [myPosts, setMyPosts] = useState([]);
    const [myFundings, setMyFundings] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [viewMode, setViewMode] = useState("funding");
    const [commentsList, setCommentsList] = useState([]);
    const [fundingList, setFundingList] = useState([]);

    // 초기 데이터 로드
    useEffect(() => {
        if (!loginUser) {
            alert("로그인이 필요한 페이지입니다.");
            navigate("/login");
            return;
        }

        // 회원정보에서 현재 로그인 유저 가져오기
        const users = JSON.parse(localStorage.getItem("회원정보")) || [];
        const me = users.find(u => u.id === loginUser.id);
        setCurrentUser(me || null);

        // 게시글, 펀딩 불러오기
        const boardData = JSON.parse(localStorage.getItem("게시글 정보")) || [];
        const savedFundings = JSON.parse(localStorage.getItem("fundingList")) || [];

        // fundingList 초기화 후 favorites 기반 liked 세팅
        const favorites = me?.favorites || [];
        const updatedFundings = savedFundings.map(f => ({
            ...f,
            liked: favorites.includes(f.id)
        }));
        setFundingList(updatedFundings);

        // 나의 게시글 / 나의 펀딩
        setMyPosts(boardData.filter(p => p.author === loginUser.id).reverse());
        setMyFundings(updatedFundings.filter(f => f.createUser === loginUser.id));

        // 댓글은 각 글의 comments 배열로 관리
        setCommentsList(boardData.flatMap(post => post.comments.map(c => ({ ...c, postId: post.id, fundingId: post.fundingId }))).filter(p=>p.author === loginUser.id));
        console.log(commentsList);

        // 쿼리 파라미터 mode
        const queryParams = new URLSearchParams(location.search);
        const mode = queryParams.get("mode");
        if (mode) setViewMode(mode);
    }, [loginUser, location.search, navigate]);

    // 좋아요 토글 & 회원정보 동기화
    const handleLikeToggle = (id, liked) => {
        // 1. fundingList 업데이트
        const updatedList = fundingList.map(item =>
            item.id === id
                ? { ...item, liked, likeCount: item.likeCount + (liked ? 1 : -1) }
                : item
        );
        setFundingList(updatedList);
        localStorage.setItem("fundingList", JSON.stringify(updatedList));

        // 2. 회원정보 favorites 업데이트
        if (currentUser) {
            const users = JSON.parse(localStorage.getItem("회원정보")) || [];
            const updatedUsers = users.map(user => {
                if (user.id === currentUser.id) {
                    const newFavorites = liked
                        ? [...(user.favorites || []), id]
                        : (user.favorites || []).filter(fid => fid !== id);
                    user.favorites = newFavorites;
                    return { ...user, favorites: newFavorites };
                }
                return user;
            });
            localStorage.setItem("회원정보", JSON.stringify(updatedUsers));
            setCurrentUser(updatedUsers.find(u => u.id === currentUser.id));
        }
    };

    const handlePostDelete = (id) => {
        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            const allPosts = JSON.parse(localStorage.getItem("게시글 정보")) || [];
            localStorage.setItem("게시글 정보", JSON.stringify(allPosts.filter(p => p.id !== id)));
            window.location.reload();
        }
    };

    const handleCommentDelete = (commentId) => {
        if (window.confirm("댓글을 삭제하시겠습니까?")) {
            const updatedComments = commentsList.filter(c => c.id !== commentId);
            setCommentsList(updatedComments);

            // 로컬스토리지 업데이트
            const allPosts = JSON.parse(localStorage.getItem("게시글 정보")) || [];
            const updatedPosts = allPosts.map(post => ({
                ...post,
                comments: post.comments.filter(c => c.id !== commentId)
            }));
            localStorage.setItem("게시글 정보", JSON.stringify(updatedPosts));
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
                <Button
                    variant={viewMode === "funding" ? "dark" : "outline-dark"}
                    onClick={() => setViewMode("funding")}
                >나의 펀딩</Button>
                <Button
                    variant={viewMode === "community" ? "dark" : "outline-dark"}
                    onClick={() => setViewMode("community")}
                >내가 쓴 글</Button>
            </ButtonGroup>

            {/* 나의 펀딩 탭 */}
            {viewMode === "funding" && (
                <div className="my-activity-section">
                    <section className="mb-5">
                        <h5 className="fw-bold mb-3 border-start border-4 border-primary ps-3">등록한 펀딩</h5>
                        <div className="p-4 bg-light rounded">
                            {myFundings.length > 0 ? (
                                <div className="funding-grid">
                                    {myFundings.map(f => (
                                        <FundingCard
                                            key={f.id}
                                            funding={f}
                                            onLikeToggle={handleLikeToggle}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-muted m-0 py-4">참여한 내역이 없습니다.</p>
                            )}
                        </div>
                    </section>
                </div>
            )}

            {/* 내가 쓴 글 탭 */}
            {viewMode === "community" && (
                <Card className="border-0 shadow-sm rounded-4 overflow-hidden p-4">
                    <h4>작성한 글</h4>
                    <Table hover borderless className="mb-0 text-center">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th style={{ width: '50%' }}>제목</th>
                                <th>날짜</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPosts.length > 0 ? myPosts.map(post => (
                                <tr
                                    key={post.id}
                                    className="border-bottom align-middle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/fundingDetail/${post.fundingId}/community/post/${post.id}`)}
                                >
                                    <td className="ps-4 py-3 text-start fw-bold">{post.title}</td>
                                    <td className="py-3 text-muted" style={{ fontSize: '0.9rem' }}>{post.date}</td>
                                    <td className="py-3">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation(); 
                                                handlePostDelete(post.id);
                                            }}
                                        >
                                            삭제
                                        </Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-5 text-muted">작성한 게시물이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

                    {/* 댓글 영역 */}
                    <h5 className="mt-5 fw-bold">댓글</h5>
                    <Table hover borderless className="mb-0 text-center">
                        <thead className="bg-light border-bottom">
                            <tr>
                                <th style={{ width: '50%' }}>내용</th>
                                <th>작성자</th>
                                <th>날짜</th>
                                <th>관리</th>
                            </tr>
                        </thead>
                        <tbody>
                            {commentsList.length > 0 ? commentsList.map(c => (
                                <tr
                                    key={c.id}
                                    className="border-bottom align-middle"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => navigate(`/fundingDetail/${c.fundingId}/community/post/${c.postId}`)}
                                >
                                    <td className="ps-4 py-3 text-start">{c.text}</td>
                                    <td className="py-3">{c.author}</td>
                                    <td className="py-3 text-muted" style={{ fontSize: '0.9rem' }}>{c.date}</td>
                                    <td className="py-3">
                                        {c.author === currentUser.id && (
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={(e) => {
                                                    e.stopPropagation(); 
                                                    handleCommentDelete(c.id);
                                                }}
                                            >
                                                삭제
                                            </Button>
                                        )}
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-5 text-muted">작성된 댓글이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Card>
            )}
        </Container>
    );
}
