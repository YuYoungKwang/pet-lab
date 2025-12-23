import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "../../styles/FundingRegister.css";

function FundingRegister() {
    const navigate = useNavigate();
    const loginUser = JSON.parse(localStorage.getItem("loginUser"));
    useEffect(() => {

        if (!loginUser) {
            navigate("/login", { replace: true });
        }

    }, [navigate]);



    const categories = [
        '펫 푸드', '위생·미용', '장난감·훈련용품',
        '하우스·이동용품', '건강·케어',
        '의류·액세서리', '식기·급식기', 'IT·스마트 용품'
    ];

    const [step, setStep] = useState(1);

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
    const [rewardSelects, setRewardSelects] = useState([{ title: "선물 없이 후원하기", description: "", price: 1000 }]);

    /* ================= 기타 ================= */
    const [budget, setBudget] = useState("");
    const [schedule, setSchedule] = useState("");
    const [team, setTeam] = useState({ description: "", images: [] });
    const [safetyInfo, setSafetyInfo] = useState({ policy: "" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);


    /* ======= 단계별 유효성 체크 ======= */
    const validateStep = (step) => {
        switch (step) {
            case 1:
                if (!title.trim()) { alert("펀딩 제목을 입력해주세요."); return false; }
                if (!category) { alert("카테고리를 선택해주세요."); return false; }
                if (!thumbnailImage) { alert("대표 이미지를 선택해주세요."); return false; }
                if (targetAmount <= 0) { alert("목표 금액을 입력해주세요."); return false; }
                if (!startDate || !endDate) { alert("펀딩 시작/종료일을 입력해주세요."); return false; }
                
                

                const start = new Date(startDate);
                const end = new Date(endDate);

                if (start < today) {
                    alert("펀딩 시작일은 오늘 이후여야 합니다.");
                    return false;
                }

                if (start >= end) {
                    alert("펀딩 종료일은 시작일 이후여야 합니다.");
                    return false;
                }

                if (!paymentDate || !expectedDeliveryDate) {
                    alert("결제일과 배송 예정일을 입력해주세요.");
                    return false;
                }

                const payment = new Date(paymentDate);
                const delivery = new Date(expectedDeliveryDate);

                if (payment < end) {
                    alert("결제일은 펀딩 종료일 이후여야 합니다.");
                    return false;
                }

                if (delivery <= payment) {
                    alert("배송 예정일은 결제일 이후여야 합니다.");
                    return false;
                }

                return true;
            case 2:
                if (!description.trim() && !introImages) { alert("프로젝트 설명을 입력해주세요."); return false; }
                return true;
            case 3:
                if (!!rewards.rewardExplain.trim() && !rewards.images) { alert("리워드 설명을 입력해주세요."); return false; }
                if (!rewardSelects.every(r => r.title && r.price > 0)) {
                    alert("리워드 항목을 모두 입력해주세요.");
                    return false;
                }
                return true;
            case 4:
                if (!budget.trim()) { alert("예산 활용 내용을 입력해주세요."); return false; }
                if (!schedule.trim()) { alert("일정 내용을 입력해주세요."); return false; }
                if (!team.description.trim() && !team.images) { alert("팀 설명을 입력해주세요."); return false; }
                if (!safetyInfo.policy.trim()) { alert("신뢰와 안전 정책을 입력해주세요."); return false; }
                return true;
            default: return true;
        }
    }

    const nextStep = () => {
        if (validateStep(step)) {
            setStep(step + 1);
            window.scrollTo(0, 0); // 스크롤 최상단 이동
        }
    }

    const prevStep = () => {
        setStep(step - 1);
        window.scrollTo(0, 0);
    }

    const handleSubmit = () => {
        // 마지막 단계 전체 유효성 검사
        for (let s = 1; s <= 4; s++) {
            if (!validateStep(s)) return;
        }
        const list = JSON.parse(localStorage.getItem("fundingList")) || [];
        const maxId = list.length ? Math.max(...list.map(f => f.id)) : 0;
        const newId = maxId + 1;

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
            createUser: loginUser.id,
        };


        list.push(newFunding);
        localStorage.setItem("fundingList", JSON.stringify(list));

        alert("펀딩 등록 완료!");
        navigate('/fundingDetail/' + newId);
    };

    return (
        <div className="funding-register-container">
            <h1>펀딩 등록</h1>
            {/* ======= Progress Bar ======= */}
            <div className="step-labels">
                <span className={step === 1 ? "active" : ""}>기본 정보</span>
                <span className={step === 2 ? "active" : ""}>프로젝트 소개</span>
                <span className={step === 3 ? "active" : ""}>리워드 & 예산</span>
                <span className={step === 4 ? "active" : ""}>팀 & 안전</span>
            </div>
            <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${(step / 4) * 100}%` }}></div>
            </div>

            {/* ======= Step 1: 기본 정보 ======= */}
            {step === 1 && (
                <div className="funding-register-section">
                    <h2>기본 정보</h2>
                    <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="펀딩 제목" />
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">카테고리 선택</option>
                        {categories.map((v, i) => <option key={i} value={v}>{v}</option>)}
                    </select>

                    <label className="file-upload">
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => setThumbnailImage(e.target.files[0]?.name || "")} />

                        <span>대표 이미지 선택</span>
                    </label>
                    <br />
                    {thumbnailImage && (
                        <div className="image-preview">
                            <img src={`/images/funding/${thumbnailImage}`} alt={thumbnailImage} />
                            <button onClick={() => setThumbnailImage("")}>X</button>
                        </div>
                    )}
                    <h4>목표 금액</h4>
                    <input type="number" value={targetAmount} onChange={(e) => setTargetAmount(+e.target.value)} placeholder="목표 금액" />
                    <h4>펀딩 시작일</h4>
                    <input type="date" value={startDate} min={today} onChange={(e) => setStartDate(e.target.value)} />
                    <h4>펀딩 종료일</h4>
                    <input type="date" value={endDate} min={startDate} onChange={(e) => setEndDate(e.target.value)} />
                    <h4>결제일</h4>
                    <input type="date" value={paymentDate} min={endDate} onChange={(e) => setPaymentDate(e.target.value)} />
                    <h4>배송 예정일</h4>
                    <input type="date" value={expectedDeliveryDate} min={paymentDate} onChange={(e) => setExpectedDeliveryDate(e.target.value)} />

                    <div className="button-group">
                        <button onClick={nextStep}>다음</button>
                    </div>
                </div>
            )}

            {/* ======= Step 2: 프로젝트 소개 ======= */}
            {step === 2 && (
                <div className="funding-register-section">
                    <h2>프로젝트 소개</h2>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="프로젝트 설명" />

                    <label className="file-upload">
                        <input type="file" accept="image/*" style={{ display: "none" }} multiple onChange={(e) => {
                            const files = Array.from(e.target.files).map(f => f.name);
                            setIntroImages(prev => [...prev, ...files]);
                        }} />
                        <span>소개 이미지 선택</span>
                    </label>

                    <div className="image-list">
                        {introImages.map((img, i) => (
                            <div key={i} className="image-preview">
                                <img src={`/images/funding/${img}`} alt={img} />
                                <button onClick={() => setIntroImages(prev => prev.filter((_, idx) => idx !== i))}>X</button>
                            </div>
                        ))}
                    </div>

                    <div className="button-group">
                        <button onClick={prevStep}>이전</button>
                        <button onClick={nextStep}>다음</button>
                    </div>
                </div>
            )}

            {/* ======= Step 3: 리워드 & 예산 ======= */}
            {step === 3 && (
                <div className="funding-register-section">
                    <h2>리워드 & 예산</h2>

                    <h4>리워드 설명</h4>
                    <textarea value={rewards.rewardExplain} onChange={(e) => setRewards((p) => ({ ...p, rewardExplain: e.target.value }))} />

                    <label className="file-upload">
                        <input type="file" accept="image/*" style={{ display: "none" }} multiple onChange={(e) => {
                            const files = Array.from(e.target.files).map(f => f.name);
                            setRewards((p) => ({ ...p, images: [...p.images, ...files] }));
                        }} />
                        <span>리워드 이미지 선택</span>
                    </label>

                    <div className="image-list">
                        {rewards.images.map((img, i) => (
                            <div key={i} className="image-preview">
                                <img src={`/images/funding/${img}`} alt={img} />
                                <button onClick={() => setRewards((p) => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}>X</button>
                            </div>
                        ))}
                    </div>

                    <h4>리워드 항목</h4>
                    {rewardSelects.map((r, i) => (
                        <div key={i} className="reward-item">
                            <input value={r.title} onChange={(e) => {
                                const next = [...rewardSelects];
                                next[i].title = e.target.value;
                                setRewardSelects(next);
                            }} placeholder="리워드명" />
                            <textarea value={r.description} onChange={(e) => {
                                const next = [...rewardSelects];
                                next[i].description = e.target.value;
                                setRewardSelects(next);
                            }} placeholder="리워드 설명" />
                            <span>후원 금액</span>
                            <input type="number" value={r.price} onChange={(e) => {
                                const next = [...rewardSelects];
                                next[i].price = +e.target.value;
                                setRewardSelects(next);
                            }} placeholder="후원 금액" />
                        </div>
                    ))}
                    <button className="add-reward" onClick={() => setRewardSelects(p => [...p, { title: "", description: "", price: 0 }])}>리워드 추가</button>



                    <div className="button-group">
                        <button onClick={prevStep}>이전</button>
                        <button onClick={nextStep}>다음</button>
                    </div>
                </div>
            )}

            {/* ======= Step 4: 그외정보 ======= */}
            {step === 4 && (
                <div className="funding-register-section">

                    <h4>예산 활용 내용</h4>
                    <textarea value={budget} onChange={(e) => setBudget(e.target.value)} placeholder="예산 설명" />
                    <h4>일정 내용</h4>
                    <textarea value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="일정 설명" />
                    <h4>팀 소개</h4>
                    <textarea value={team.description} onChange={(e) => setTeam(p => ({ ...p, description: e.target.value }))} placeholder="팀 설명" />

                    <label className="file-upload">
                        <input type="file" accept="image/*" style={{ display: "none" }} multiple onChange={(e) => {
                            const files = Array.from(e.target.files).map(f => f.name);
                            setTeam(p => ({ ...p, images: [...p.images, ...files] }));
                        }} />
                        <span>팀 이미지 선택</span>
                    </label>

                    <div className="image-list">
                        {team.images.map((img, i) => (
                            <div key={i} className="image-preview">
                                <img src={`/images/funding/${img}`} alt={img} />
                                <button onClick={() => setTeam(p => ({ ...p, images: p.images.filter((_, idx) => idx !== i) }))}>X</button>
                            </div>
                        ))}
                    </div>

                    <h4>신뢰와 안전 정책</h4>
                    <textarea value={safetyInfo.policy} onChange={(e) => setSafetyInfo({ policy: e.target.value })} placeholder="정책 안내" />

                    <div className="button-group">
                        <button onClick={prevStep}>이전</button>
                        <button onClick={handleSubmit}>등록</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FundingRegister;
