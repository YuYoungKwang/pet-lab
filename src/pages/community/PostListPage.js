import { useState } from "react";
import { useNavigate, useParams, useOutletContext } from "react-router-dom";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import FundingHeader from "../../components/common/FundingHeader";

const ITEMS_PER_PAGE = 10;

export default function PostListPage() {
    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const [searchKeyword, setSearchKeyword] = useState("");
    const [filter, setFilter] = useState("title");
    const [currentPage, setCurrentPage] = useState(1);
    const { category = "free" } = useParams();
    const { posts = [], funding } = useOutletContext();

    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    const isLogin = !!loginUser; // 로그인 상태 확인


    const filteredPosts = posts
    .filter((post) => (post.category ?? "free") === category)
    .filter((post) => {
        if (!searchKeyword.trim()) return true;

        const lower = searchKeyword.toLowerCase();

        if (filter === "title") return post.title.toLowerCase().includes(lower);
        if (filter === "title_content") {
            return (
                post.title.toLowerCase().includes(lower) ||
                post.content.toLowerCase().includes(lower)
            );
        }
        if (filter === "author") return post.author.toLowerCase().includes(lower);

        return true;
    });


    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

    const pagedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return (
        <Container className="mt-4" style={{ maxWidth: 600 }}>
            {funding && <FundingHeader funding={funding} />}

            <Card>
                <Card.Body>
                    {/* 게시판 버튼 */}
                    <div className="d-flex justify-content-center gap-2 mb-3">
                        <Button
                            size="sm"
                            variant={category === "free" ? "primary" : "outline-primary"}
                            onClick={() => {
                                navigate("../board/free", { replace: true });
                                setCurrentPage(1);
                            }}
                        >
                            자유
                        </Button>

                        <Button
                            size="sm"
                            variant={category === "info" ? "primary" : "outline-primary"}
                            onClick={() => {
                                navigate("../board/info", { replace: true });
                                setCurrentPage(1);
                            }}
                        >
                            정보공유
                        </Button>

                        <Button
                            size="sm"
                            variant={category === "qna" ? "primary" : "outline-primary"}
                            onClick={() => {
                                navigate("../board/qna", { replace: true });
                                setCurrentPage(1);
                            }}
                        >
                            질문/답변
                        </Button>

                        <Button
                            size="sm"
                            variant={category === "feedback" ? "primary" : "outline-primary"}
                            onClick={() => {
                                navigate("../board/feedback", { replace: true });
                                setCurrentPage(1);
                            }}
                        >
                            피드백
                        </Button>
                    </div>


                    <Table hover responsive className="mb-3">
                        <thead>
                            <tr>
                                <th style={{ width: "15%" }}>번호</th>
                                <th>글쓴이</th>
                                <th>제목</th>
                                <th style={{ width: "25%" }}>작성일</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pagedPosts.length === 0 ? (
                                <tr>
                                    <td colSpan={3} className="text-center text-muted">
                                        검색 결과가 없습니다
                                    </td>
                                </tr>
                            ) : (
                                pagedPosts.map((post, idx) => (
                                    <tr
                                        key={post.id}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => navigate(`../post/${post.id}`, { state: { category } })}
                                    >
                                        <td>
                                            {(currentPage - 1) * ITEMS_PER_PAGE + idx + 1}
                                        </td>
                                        <td>{post.author}</td>
                                        <td>{post.title}</td>
                                        <td>{post.date}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>

                    {/* 페이지네이션 */}
                    {totalPages > 1 && (
                        <div className="d-flex justify-content-center gap-1 mb-3">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Button
                                    key={i}
                                    size="sm"
                                    variant={currentPage === i + 1 ? "primary" : "outline-primary"}
                                    onClick={() => setCurrentPage(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                    )}

                    <div className="d-grid">
                        <Button
                            onClick={() => {
                                if (!isLogin) {
                                    alert("로그인 후 이용 가능합니다.");
                                    navigate("/login");
                                    return;
                                }
                                navigate("../write");
                            }}
                        >
                            글쓰기
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {/* 검색 영역 */}
            <Card className="mb-3 mt-3">
                <Card.Body className="d-flex gap-2 align-items-center py-2">
                    <Form.Select
                        size="sm"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        style={{ width: 120 }}
                    >
                        <option value="title">제목</option>
                        <option value="title_content">제목 + 내용</option>
                        <option value="author">글쓴이</option>
                    </Form.Select>

                    <Form.Control
                        size="sm"
                        placeholder="검색어 입력"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    <Button
                        size="sm"
                        variant="secondary"
                        className="text-nowrap"
                        onClick={() => {
                            setSearchKeyword(keyword);
                            setCurrentPage(1);
                        }}
                    >검색</Button>
                </Card.Body>
            </Card>

        </Container>
    );
}
