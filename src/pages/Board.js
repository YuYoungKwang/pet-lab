import { useState, useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { Container, Table, Button, ButtonGroup, Card } from "react-bootstrap";
import FundingCard from "../components/common/FundingCard";
import '../styles/Board.css';

function Board() {
    const location = useLocation();
    const navigate = useNavigate();

    // 로딩 상태 추가 (초기값 true)
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);
    const [viewMode, setViewMode] = useState("funding");
    const [myPosts, setMyPosts] = useState([]);
    const [myFundings, setMyFundings] = useState([]);
    const [commentsList, setCommentsList] = useState([]);
    const [fundingList, setFundingList] = useState([]);

    useEffect(() => {
        // 1. 로그인 유저 정보 가져오기
        const storedUser = JSON.parse(localStorage.getItem("loginUser"));
        
        if (!storedUser) {
            setIsLoading(false); // 로그인 정보 없으면 로딩 종료 (아래에서 리다이렉트 처리됨)
            return;
        }

        const users = JSON.parse(localStorage.getItem("회원정보")) || [];
        const me = users.find(u => u.id === storedUser.id) || null;
        setCurrentUser(me);

        // 2. 게시글 및 펀딩 데이터 로드
        const boardData = JSON.parse(localStorage.getItem("게시글 정보")) || [];
        const savedFundings = JSON.parse(localStorage.getItem("fundingList")) || [];

        // fundingList 초기화 + liked 세팅
        const updatedFundings = savedFundings.map(f => ({
            ...f,
            liked: me?.favorites?.includes(f.id) || false
        }));
        setFundingList(updatedFundings);

        // 나의 게시글 / 나의 펀딩 필터링
        setMyPosts(boardData.filter(p => p.author === storedUser.id).reverse());
        setMyFundings(updatedFundings.filter(f => f.createUser === storedUser.id));

        // 댓글 초기화 (안전한 처리를 위해 옵셔널 체이닝 ?. 및 기본값 [] 추가)
        const userComments = boardData.flatMap(post =>
            (post.comments || []).map(c => ({ ...c, postId: post.id, fundingId: post.fundingId }))
        ).filter(c => c.author === storedUser.id);
        setCommentsList(userComments);

        // 쿼리 파라미터 체크
        const mode = new URLSearchParams(location.search).get("mode");
        if (mode) setViewMode(mode);

        // 모든 데이터 로드가 완료되면 로딩 상태 해제
        setIsLoading(false);
    }, [location.search]);

    // --- 이벤트 핸들러 (기존과 동일) ---
    const handleLikeToggle = (id, liked) => {
        const updatedList = fundingList.map(f =>
            f.id === id ? { ...f, liked, likeCount: f.likeCount + (liked ? 1 : -1) } : f
        );
        setFundingList(updatedList);
        localStorage.setItem("fundingList", JSON.stringify(updatedList));

        const users = JSON.parse(localStorage.getItem("회원정보")) || [];
        const updatedUsers = users.map(user => {
            if (user.id === currentUser.id) {
                const newFavorites = liked
                    ? [...(user.favorites || []), id]
                    : (user.favorites || []).filter(fid => fid !== id);
                return { ...user, favorites: newFavorites };
            }
            return user;
        });
        localStorage.setItem("회원정보", JSON.stringify(updatedUsers));
        setCurrentUser(updatedUsers.find(u => u.id === currentUser.id));
    };

    const handlePostDelete = (id) => {
        if (!window.confirm("게시글을 삭제하시겠습니까?")) return;
        const allPosts = JSON.parse(localStorage.getItem("게시글 정보")) || [];
        const updatedPosts = allPosts.filter(p => p.id !== id);
        localStorage.setItem("게시글 정보", JSON.stringify(updatedPosts));
        setMyPosts(prev => prev.filter(p => p.id !== id));
    };

    const handleCommentDelete = (commentId) => {
        if (!window.confirm("댓글을 삭제하시겠습니까?")) return;
        setCommentsList(prev => prev.filter(c => c.id !== commentId));
        const allPosts = JSON.parse(localStorage.getItem("게시글 정보")) || [];
        const updatedPosts = allPosts.map(post => ({
            ...post,
            comments: (post.comments || []).filter(c => c.id !== commentId)
        }));
        localStorage.setItem("게시글 정보", JSON.stringify(updatedPosts));
    };

    // --- 렌더링 조건부 처리 ---

    // 1. 데이터를 읽어오는 중일 때 (깜빡임 방지)
    if (isLoading) {
        return <Container className="mt-5 text-center"><h4>로딩 중...</h4></Container>;
    }

    // 2. 로딩이 끝났는데 유저가 없는 경우 리다이렉트
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

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
                                        >삭제</Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="3" className="text-center py-5 text-muted">작성한 게시물이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>

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
                                            >삭제</Button>
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
export default Board;