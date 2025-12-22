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

    
    const [loginUser, setLoginUser] = useState(() => {
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
        setPosts(prev =>
            prev.map(p =>
                p.id === postId ? { ...p, ...updatedData } : p
            )
        );
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

    const createPost = ({ title, content, category }) => {
        if (!loginUser) return;

        const newPost = {
            id: Date.now(),
            fundingId: Number(fundingId),
            title,
            content,
            category,
            author: loginUser.id,
            views: 0,
            comments: [],
            date: new Date().toLocaleDateString(),
        };
        setPosts(prev => [newPost, ...prev]);
    };

    const addComment = (postId, text) => {
        if (!loginUser) return;
        setPosts(prev =>
            prev.map(p =>
                p.id === postId
                    ? { ...p, comments: [...p.comments, {
                                id: Date.now(),
                                author: loginUser.id, // ⭐ 댓글 작성자
                                text,
                                date: new Date().toLocaleString(),
                            },
                    ],
                }
                : p
            )
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
