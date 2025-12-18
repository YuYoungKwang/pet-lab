import React, { useState, useEffect } from "react";
import '../../styles/FundingNavbar.css';
import { useNavigate } from "react-router";

function FundingNavbar({ sections }) {
    const navigate = useNavigate();

    const [activeId, setActiveId] = useState(sections[0].id);

    const handleClick = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const offset = 60; // 네비바 높이만큼 여유 공간
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 70; // 네비바 offset
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i].id);
                if (el && scrollPosition >= el.offsetTop) {
                    setActiveId(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [sections]);

    return (
        <nav className="funding-navbar">
            <ul>
                {sections.map(sec => (
                    <li
                        key={sec.id}
                        className={activeId === sec.id ? "active" : ""}
                        onClick={() => handleClick(sec.id)}
                    >
                        {sec.label}
                    </li>
                ))}
                <li className="community-btn" onClick={() => navigate("/community")}>
                    커뮤니티
                </li>
            </ul>
        </nav>
    );
}

export default FundingNavbar;
