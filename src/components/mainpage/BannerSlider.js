import '../../styles/BannerSlider.css'

function BannerSlider() {
    return (
        <div className="banner">
            <div className="banner-image">
                <img
                    src={`${process.env.PUBLIC_URL}/images/benner_petLab.png`}
                    alt="Pet-Lab 배너"
                />
            </div>
        </div>
    );
}

export default BannerSlider;
