import { useState } from "react";
import "../../styles/FundingRegister.css";

function FundingRegister() {
    /* ================= 기본 정보 ================= */
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [thumbnailImage, setThumbnailImage] = useState("");
    const [targetAmount, setTargetAmount] = useState(0);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [expectedDeliveryDate, setExpectedDeliveryDate] = useState("");

    /* ================= 프로젝트 소개 ================= */
    const [description, setDescription] = useState("");
    const [introImages, setIntroImages] = useState([]);

    /* ================= 리워드 ================= */
    const [rewards, setRewards] = useState({ rewardExplain: "", images: [] });
    const [rewardSelects, setRewardSelects] = useState([]);

    /* ================= 기타 ================= */
    const [budget, setBudget] = useState("");
    const [schedule, setSchedule] = useState("");
    const [team, setTeam] = useState({ description: "", images: [] });
    const [safetyInfo, setSafetyInfo] = useState({ policy: "" });

    /* ================= 제출 ================= */
    const handleSubmit = () => {
        const lastId = Number(localStorage.getItem("fundingLastId")) || 0;
        const newId = lastId + 1;
        localStorage.setItem("fundingLastId", newId);

        const newFunding = {
            id: newId,
            title,
            category,
            thumbnailImage,
            targetAmount,
            currentAmount: 0,
            startDate,
            endDate,
            paymentDate,
            expectedDeliveryDate,
            description,
            introImages,
            rewards,
            rewardSelects,
            budget,
            schedule,
            team,
            safetyInfo,
            likeCount: 0,
        };

        const list = JSON.parse(localStorage.getItem("fundingList")) || [];
        list.push(newFunding);
        localStorage.setItem("fundingList", JSON.stringify(list));

        alert("펀딩 등록 완료!");
    };

    const categories = [
        '펫 푸드', '위생·미용', '장난감·훈련용품',
        '하우스·이동용품', '건강·케어',
        '의류·액세서리', '식기·급식기', 'IT·스마트 용품'
    ];

    return (
        <div className="funding-register-container">
            <h1>펀딩 등록</h1>

            {/* 기본 정보 */}
            <div className="funding-register-section">
                <h2>기본 정보</h2>
                <h4>펀딩 제목</h4>
                <input value={title} onChange={(e) => setTitle(e.target.value)} />
                <h4>카테고리</h4>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option></option>
                    {categories.map((v, i)=>{
                        return <option key={i} value={v}>{v}</option>
                    })}
                </select>

                <h4>펀딩 대표 이미지</h4>
                <label>
                    <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setThumbnailImage(e.target.files[0]?.name || "")} />
                    <span className="funding-refister-file-selector">이미지파일</span>
                </label>
                <br></br>
                <br></br>
                {thumbnailImage == "" || thumbnailImage == null ?
                    <div></div> : <div className="funding-register-img-thumb-container">
                        <img src={`/images/funding/${thumbnailImage}`} alt={thumbnailImage} className="funding-register-img-thumb" />
                        <button onClick={() =>
                            setThumbnailImage("") // 삭제도 배열 필터
                        }>X</button>
                    </div>}


                <h4>목표 금액</h4>
                <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(+e.target.value)} />

                <h4>펀딩 시작일</h4>
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />

                <h4>펀딩 종료일</h4>
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />

                <h4>결제일</h4>
                <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />

                <h4>예상 발송 시작일</h4>
                <input type="date" value={expectedDeliveryDate} onChange={(e) => setExpectedDeliveryDate(e.target.value)} />
            </div>

            <hr />

            {/* 프로젝트 소개 */}
            <div className="funding-register-section">
                <h2>프로젝트 소개</h2>
                <h4>프로젝트 설명</h4>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                <h4>소개 이미지</h4>
                <label>
                    <input type="file" accept="image/*" style={{ display: "none" }} multiple onChange={(e) => {
                        const files = Array.from(e.target.files).map(f => f.name);
                        setIntroImages(prev => [...prev, ...files]); // 배열로 병합
                    }} />
                    <span className="funding-refister-file-selector">이미지파일</span>
                </label>
                <br></br>
                <br></br>
                <div className="image-list">
                    {introImages.map((img, i) => (
                        <div key={i} className="funding-register-img-thumb-container">
                            <img src={`/images/funding/${img}`} alt={img} className="funding-register-img-thumb" />
                            <button onClick={() =>
                                setIntroImages(prev => prev.filter((_, idx) => idx !== i)) // 삭제도 배열 필터
                            }>X</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 리워드 */}
            <div className="funding-register-section">
                <h2>리워드</h2>
                <h4>리워드 소개</h4>
                <textarea value={rewards.rewardExplain} onChange={(e) => setRewards((p) => ({ ...p, rewardExplain: e.target.value }))} />

                <h4>리워드 이미지</h4>
                <label>
                    <input type="file" accept="image/*" style={{ display: "none" }} multiple onChange={(e) => {
                        const files = Array.from(e.target.files).map((f) => f.name);
                        setRewards((p) => ({ ...p, images: [...p.images, ...files] }));
                    }} />
                    <span className="funding-refister-file-selector">이미지파일</span>
                </label>
                <br></br>
                <br></br>
                <div className="image-list">
                    {rewards.images.map((img, i) => (
                        <div key={i} className="funding-register-img-thumb-container">
                            <img src={`/images/funding/${img}`} alt={img} className="funding-register-img-thumb" />
                            <button onClick={() => setRewards((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}>X</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* 리워드 선택 */}
            <div className="funding-register-section">
                <h2>리워드 선택항목</h2>
                {rewardSelects.map((r, i) => (
                    <div key={i}>
                        <h4>리워드명</h4>
                        <input value={r.title} onChange={(e) => {
                            const next = [...rewardSelects];
                            next[i].title = e.target.value;
                            setRewardSelects(next);
                        }} />

                        <h4>리워드 설명</h4>
                        <textarea value={r.description} onChange={(e) => {
                            const next = [...rewardSelects];
                            next[i].description = e.target.value;
                            setRewardSelects(next);
                        }} />

                        <h4>후원 금액</h4>
                        <input type="number" value={r.price} onChange={(e) => {
                            const next = [...rewardSelects];
                            next[i].price = +e.target.value;
                            setRewardSelects(next);
                        }} />
                        <hr />
                    </div>
                ))}
                <span className="funding-refister-file-selector" onClick={() => setRewardSelects((p) => [...p, { title: "", description: "", price: 0 }])}>리워드 추가</span>
            </div>

            <div className="funding-register-section">
                <h2>예산</h2>
                <h4>예산 활용 내용</h4>
                <textarea value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>

            <hr />

            <div className="funding-register-section">
                <h2>일정</h2>
                <h4>펀딩 일정</h4>
                <textarea value={schedule} onChange={(e) => setSchedule(e.target.value)} />
            </div>

            <hr />

            <div className="funding-register-section">
                <h2>팀 소개</h2>
                <h4>팀 설명</h4>
                <textarea value={team.description} onChange={(e) => setTeam((p) => ({ ...p, description: e.target.value }))} />

                <h4>팀 이미지</h4>
                <label>
                    <input type="file" accept="image/*" style={{ display: "none" }} multiple onChange={(e) => {
                        const files = Array.from(e.target.files).map((f) => f.name);
                        setTeam((p) => ({ ...p, images: [...p.images, ...files] }));
                    }} />
                    <span className="funding-refister-file-selector">이미지파일</span>
                </label>
                <br></br>
                <br></br>
                <div className="image-list">
                    {team.images.map((img, i) => (
                        <div key={i} className="funding-register-img-thumb-container">
                            <img src={`/images/funding/${img}`} alt={img} className="funding-register-img-thumb" />
                            <button onClick={() => setTeam((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}>X</button>
                        </div>
                    ))}
                </div>
            </div>

            <hr />

            <div className="funding-register-section">
                <h2>신뢰와 안전</h2>
                <h4>정책 안내</h4>
                <textarea value={safetyInfo.policy} onChange={(e) => setSafetyInfo({ policy: e.target.value })} />
            </div>

            <button className="funding-register-btn" onClick={handleSubmit}>등록</button>
        </div>
    );
}

export default FundingRegister;
