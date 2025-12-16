import '../../styles/BannerSlider.css'

function BannerSlider() {
    return (
        <div className="banner">
            <button className="arrow left">‹</button>
            <div className="banner-image">배너 이미지</div>
            <button className="arrow right">›</button>
        </div>
    );
}

export default BannerSlider;