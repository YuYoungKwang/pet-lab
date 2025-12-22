import { useState } from 'react';
import '../../styles/Footer.css';
import Terms from '../../pages/footer/Term';
import Privacy from '../../pages/footer/Privacy';
import About from '../../pages/footer/About';
import Contact from '../../pages/footer/Contact';

function Footer() {
    const [modalContent, setModalContent] = useState(null);

    const openModal = (content) => setModalContent(content);
    const closeModal = () => setModalContent(null);

    return (
        <footer className="footer-container">
            <div className="footer-top">
                <div className="footer-links">
                    <span onClick={() => openModal('about')}>회사소개</span>
                    <span onClick={() => openModal('terms')}>이용약관</span>
                    <span onClick={() => openModal('privacy')}>개인정보처리방침</span>
                    <span onClick={() => openModal('contact')}>고객센터</span>
                </div>
            </div>
            <div className="footer-bottom">
                <p>© 2025 PetLab. All rights reserved.</p>
            </div>

            {modalContent && (
                <div className="footer-modal-overlay" onClick={closeModal}>
                    <div className="footer-modal-content" onClick={e => e.stopPropagation()}>
                        <button className="footer-modal-close" onClick={closeModal}>X</button>
                        {modalContent === 'terms' && <Terms />}
                        {modalContent === 'privacy' && <Privacy />}
                        {modalContent === 'about' && <About />}
                        {modalContent === 'contact' && <Contact />}
                    </div>
                </div>
            )}
        </footer>
    );
}

export default Footer;
