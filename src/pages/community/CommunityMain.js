import { Outlet, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../styles/Community.css";



export default function CommunityMain() {
    const { fundingId } = useParams();
    const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("게시글 정보");
    return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("게시글 정보", JSON.stringify(posts));
    }, [posts]);

    const filteredPosts = fundingId
    ? posts.filter((p) => p.fundingId === Number(fundingId))
    : posts;

    const createPost = ({ title, content, category }) => {
    const newPost = {
        id: Date.now(),
        fundingId: Number(fundingId),
        title,
        content,
        category,
        author: "익명",
        views: 0,
        comments: [],
        date: new Date().toLocaleDateString(),
        };
        setPosts((prev) => [newPost, ...prev]);
    };


    const addComment = (postId, text) => {
        setPosts((prev) =>
            prev.map((p) =>
                p.id === postId ? { ...p, comments: [...p.comments, text] } : p
            )
        );
    };


    const increaseView = (postId) => {
        setPosts((prev) =>
            prev.map((p) => (p.id === postId ? { ...p, views: p.views + 1 } : p))
        );
    };

    return (
        <div className="community-page">
            <Outlet context={{
                posts: filteredPosts,
                createPost,
                addComment,
                increaseView
            }} />
        </div>
    );
}