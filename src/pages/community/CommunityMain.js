import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Community.css";

export default function CommunityMain() {
    const { fundingId } = useParams();

    const [funding, setFunding] = useState(null);

    useEffect(() => {
        if (!fundingId) return;

        const data = localStorage.getItem("fundingList");
        if (!data) return;

        const fundings = JSON.parse(data);
        const found = fundings.find(f => f.id === Number(fundingId));
        setFunding(found || null);
    }, [fundingId]);

    
    const [loginUser] = useState(() => {
        const saved = localStorage.getItem("loginUser");
        return saved ? JSON.parse(saved) : null;
    }); // 로그인 정보

    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("게시글 정보");
        return saved ? JSON.parse(saved) : [];
    });

    /* =========================
        🗑 게시글 삭제
    ========================= */
    const deletePost = (postId) => {
        setPosts(prev => prev.filter(p => p.id !== postId));
    };

    /* =========================
        ✏️ 게시글 수정
    ========================= */
    const updatePost = (postId, updatedData) => {
        if (!updatedData.title?.trim()) {
            alert("제목을 입력해주세요.");
            return false;
        }

        if (!updatedData.content?.trim()) {
            alert("내용을 입력해주세요.");
            return false;
        }

        setPosts(prev =>
            prev.map(p =>
                p.id === postId ? { ...p, ...updatedData } : p
            )
        );

        return true;
    };


    /* =========================
        🗑 댓글 삭제
    ========================= */
    const deleteComment = (postId, commentId) => {
        setPosts(prev =>
            prev.map(p =>
                p.id === postId
                    ? {
                        ...p,
                        comments: p.comments.filter(c => c.id !== commentId)
                    }
                    : p
            )
        );
    };

    useEffect(() => {
        localStorage.setItem("게시글 정보", JSON.stringify(posts));
    }, [posts]);

    const filteredPosts = fundingId
        ? posts.filter(p => p.fundingId === Number(fundingId))
        : posts;

    const ALLOWED_CATEGORIES = ["free", "info", "qna", "feedback"];

    const createPost = ({ title, content, category }) => {
        if (!loginUser) return false;

        if (!title || !title.trim()) {
            alert("제목을 입력해주세요.");
            return false;
        }

        if (!content || !content.trim()) {
            alert("내용을 입력해주세요.");
            return false;
        }

        if (!ALLOWED_CATEGORIES.includes(category)) {
            alert("올바르지 않은 카테고리입니다.");
            return false;
        }

        if (title.length > 100) {
            alert("제목은 100자 이내로 입력해주세요.");
            return false;
        }

        if (content.length > 2000) {
            alert("내용은 2000자 이내로 입력해주세요.");
            return false;
        }

        const newPost = {
            id: Date.now(),
            fundingId: Number(fundingId),
            title: title.trim(),
            content: content.trim(),
            category,
            author: loginUser.id,
            views: 0,
            comments: [],
            date: new Date().toLocaleDateString(),
        };

        setPosts(prev => [newPost, ...prev]);
        return true;   // ✅ 성공
    };


    const addComment = (postId, text) => {
        if (!text || !text.trim()) {
            alert("댓글을 입력해주세요.");
            return;
        }

        setPosts((prev) =>
            prev.map((p) => {
                if (p.id !== postId) return p;

                return {
                    ...p,
                    comments: [
                        ...p.comments,
                        {
                            id: Date.now(),
                            author: loginUser.id,
                            text: text.trim(),
                            date: new Date().toLocaleString(),
                        },
                    ],
                };
            })
        );
    };


    const increaseView = (postId) => {
        setPosts(prev =>
            prev.map(p =>
                p.id === postId ? { ...p, views: p.views + 1 } : p
            )
        );
    };

    return (
        <div className="community-page">
            <Outlet
                context={{
                    posts: filteredPosts,
                    funding,
                    createPost,
                    addComment,
                    increaseView,
                    deletePost,
                    updatePost,
                    deleteComment,
                }}
            />
        </div>
    );
}
