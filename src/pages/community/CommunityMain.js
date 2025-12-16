import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import PostListPage from "./PostListPage";
import PostWritePage from "./PostWritePage";
import PostDetailPage from "./PostDetailPage";
import "./Community.css";



export default function CommunityMain() {
    const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("community_posts");
    return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("community_posts", JSON.stringify(posts));
    }, [posts]);

    const createPost = ({ title, content, category }) => {
    const newPost = {
        id: Date.now(),
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
        <Routes>
            <Route path="/" element={<PostListPage posts={posts} />} />
            <Route path="/board/:category" element={<PostListPage posts={posts} />} />
            <Route path="/write" element={<PostWritePage onSubmit={createPost} />} />
            <Route
                path="/post/:id"
                element={
                    <PostDetailPage
                        posts={posts}
                        onAddComment={addComment}
                        onView={increaseView}
                    />
                }
            />
        </Routes>
    );
}