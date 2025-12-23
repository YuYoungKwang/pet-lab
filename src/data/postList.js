const postList = [
    {
        id: 1768100000001,
        "fundingId":  1,
        title: "펀딩 첫 참여 후기",
        content: "관심만 있다가 처음으로 참여해봤는데 생각보다 과정이 간단하네요.",
        category: "free",
        author: "db99817",
        views: 18,
        comments: [
            {
                id: 1768100001001,
                author: "hongjegue",
                text: "처음이면 좀 헷갈릴 수도 있는데 잘 만드신 듯해요",
                date: "2025. 12. 21. 오전 9:14:22"
            }
        ],
        date: "2025. 12. 21."
    },
    {
        id: 1768100000002,
        "fundingId":  1,
        title: "UI가 생각보다 직관적이에요",
        content: "카테고리 이동이랑 상세 페이지 구성이 깔끔해서 보기 편했습니다.",
        category: "free",
        author: "hongjegue",
        views: 32,
        comments: [],
        date: "2025. 12. 21."
    },
    {
        id: 1768100000003,
        "fundingId":  1,
        title: "강아지 간식 펀딩 고민 중",
        content: "성분은 괜찮아 보이는데 기호성이 어떨지 모르겠네요.",
        category: "free",
        author: "db99817",
        views: 27,
        comments: [
            {
                id: 1768100001002,
                author: "hongjegue",
                text: "저도 그 부분이 제일 고민됐어요",
                date: "2025. 12. 21. 오후 1:03:11"
            },
            {
                id: 1768100001003,
                author: "db99817",
                text: "후기 더 올라오면 결정하려고요",
                date: "2025. 12. 21. 오후 1:20:45"
            }
        ],
        date: "2025. 12. 21."
    },
    {
        id: 1768100000004,
        "fundingId":  1,
        title: "마감 임박이라 참여했어요",
        content: "남은 기간이 얼마 안 남아서 고민하다가 참여했습니다.",
        category: "free",
        author: "hongjegue",
        views: 41,
        comments: [],
        date: "2025. 12. 22."
    },
    {
        id: 1768100000005,
        "fundingId":  1,
        title: "펫 펀딩은 항상 기대 반 걱정 반",
        content: "아이디어는 좋은데 실제 제품 퀄리티가 관건이죠.",
        category: "free",
        author: "db99817",
        views: 36,
        comments: [
            {
                id: 1768100001004,
                author: "hongjegue",
                text: "맞아요 실물 받아보기 전까지는 모르겠어요",
                date: "2025. 12. 22. 오전 10:48:02"
            }
        ],
        date: "2025. 12. 22."
    },
    {
        id: 1768100000006,
        "fundingId":  1,
        title: "후원 금액 선택이 편했어요",
        content: "옵션별 설명이 잘 돼 있어서 고르기 수월했습니다.",
        category: "free",
        author: "hongjegue",
        views: 29,
        comments: [],
        date: "2025. 12. 22."
    },
    {
        id: 1768100000007,
        "fundingId":  1,
        title: "상세 설명 조금만 더 있었으면",
        content: "제조 과정이나 테스트 내용이 더 있으면 좋을 것 같아요.",
        category: "free",
        author: "db99817",
        views: 34,
        comments: [
            {
                id: 1768100001005,
                author: "hongjegue",
                text: "정보 많을수록 신뢰가 가긴 하죠",
                date: "2025. 12. 22. 오후 4:12:09"
            }
        ],
        date: "2025. 12. 22."
    },
    {
        id: 1768100000008,
        "fundingId":  1,
        title: "펀딩 성공했으면 좋겠네요",
        content: "응원하는 마음으로 참여했습니다. 결과가 기대돼요.",
        category: "free",
        author: "hongjegue",
        views: 22,
        comments: [],
        date: "2025. 12. 23."
    },
    {
        id: 1768100000009,
        "fundingId":  1,
        title: "후기 글 더 많아졌으면",
        content: "참여자 후기가 많아지면 결정하기 더 쉬울 것 같아요.",
        category: "free",
        author: "db99817",
        views: 39,
        comments: [],
        date: "2025. 12. 23."
    },
    {
        id: 1768100000010,
        "fundingId":  1,
        title: "전체적으로 서비스 안정적인 느낌",
        content: "아직 초기 같긴 한데 사용하면서 큰 불편은 없었어요.",
        category: "free",
        author: "hongjegue",
        views: 47,
        comments: [
            {
                id: 1768100001006,
                author: "db99817",
                text: "저도 비슷하게 느꼈어요",
                date: "2025. 12. 23. 오전 11:02:31"
            }
        ],
        date: "2025. 12. 23."
    },
    {
        "id": 1766500000001,
        "fundingId":  1,
        "title": "반려동물과 함께하는 주말 산책",
        "content": "이번 주말에 반려동물과 함께 공원 산책을 다녀왔습니다. 날씨가 좋아서 너무 행복했어요.",
        "category": "free",
        "author": "db99817",
        "views": 23,
        "comments": [
            {
                "id": 1766500000101,
                "author": "hongjegue",
                "text": "저도 이번 주말에 산책 갔는데 날씨가 좋더라구요!",
                "date": "2025. 12. 23. 오전 9:10:12"
            },
            {
                "id": 1766500000102,
                "author": "db99817",
                "text": "맞아요, 공원에서 사진도 많이 찍었어요.",
                "date": "2025. 12. 23. 오전 9:12:45"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000002,
        "fundingId":  1,
        "title": "강아지 첫 목욕 후기",
        "content": "우리 집 강아지 첫 목욕 시도! 처음엔 물을 무서워했지만 점점 적응하더라구요.",
        "category": "free",
        "author": "hongjegue",
        "views": 15,
        "comments": [
            {
                "id": 1766500000201,
                "author": "db99817",
                "text": "첫 목욕은 항상 힘들죠 ㅋㅋ 그래도 잘했네요!",
                "date": "2025. 12. 23. 오전 10:05:30"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000003,
        "fundingId":  1,
        "title": "고양이 장난감 추천",
        "content": "우리 고양이가 좋아하는 장난감을 찾고 있어요. 털 날림이 적은 장난감 있으면 추천해주세요.",
        "category": "free",
        "author": "db99817",
        "views": 12,
        "comments": [
            {
                "id": 1766500000301,
                "author": "hongjegue",
                "text": "저희 집 고양이는 레이저 포인터 좋아해요.",
                "date": "2025. 12. 23. 오전 11:20:05"
            },
            {
                "id": 1766500000302,
                "author": "db99817",
                "text": "좋아요, 레이저 포인터도 시도해봐야겠네요!",
                "date": "2025. 12. 23. 오전 11:22:10"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000004,
        "fundingId":  1,
        "title": "반려동물 건강 관리",
        "content": "요즘 강아지가 잦은 재채기를 해서 걱정이에요. 혹시 비슷한 경험 있으신가요?",
        "category": "free",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766500000401,
                "author": "db99817",
                "text": "저희 강아지도 한 달 전부터 그랬는데, 병원 다녀오니 괜찮아졌어요.",
                "date": "2025. 12. 23. 오후 12:00:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000005,
        "fundingId":  1,
        "title": "고양이 털 관리 팁",
        "content": "겨울이라 고양이 털이 많이 빠지네요. 좋은 빗질 방법 있을까요?",
        "category": "free",
        "author": "db99817",
        "views": 28,
        "comments": [
            {
                "id": 1766500000501,
                "author": "hongjegue",
                "text": "부드러운 브러시로 매일 조금씩 빗어주는 게 좋더라구요.",
                "date": "2025. 12. 23. 오후 12:30:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000006,
        "fundingId":  1,
        "title": "새로운 반려견 훈련법",
        "content": "최근에 알게 된 긍정 강화 훈련법을 시도하고 있어요. 효과가 꽤 좋네요.",
        "category": "free",
        "author": "hongjegue",
        "views": 14,
        "comments": [
            {
                "id": 1766500000601,
                "author": "db99817",
                "text": "긍정 강화 훈련법 저도 관심 있어요. 구체적으로 어떻게 하시나요?",
                "date": "2025. 12. 23. 오후 1:00:05"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000007,
        "fundingId":  1,
        "title": "반려동물과 여행 계획",
        "content": "다음 달에 강아지와 함께 1박 여행을 계획 중이에요. 추천 여행지 있으신가요?",
        "category": "free",
        "author": "db99817",
        "views": 21,
        "comments": [
            {
                "id": 1766500000701,
                "author": "hongjegue",
                "text": "강릉 해변 쪽은 애견 동반이 가능해서 좋아요.",
                "date": "2025. 12. 23. 오후 1:30:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000008,
        "fundingId":  1,
        "title": "고양이 식습관 공유",
        "content": "우리 집 고양이가 편식이 심해요. 추천 사료나 간식 있으신가요?",
        "category": "free",
        "author": "hongjegue",
        "views": 16,
        "comments": [
            {
                "id": 1766500000801,
                "author": "db99817",
                "text": "저희는 사료에 조금 물 섞어주니 잘 먹더라구요.",
                "date": "2025. 12. 23. 오후 2:10:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000009,
        "fundingId":  1,
        "title": "반려견 산책 코스 추천",
        "content": "주말마다 반려견과 산책하려고 하는데, 안전하고 좋은 코스 추천해주세요.",
        "category": "free",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766500000901,
                "author": "hongjegue",
                "text": "서울숲 쪽은 애견 동반 가능해서 좋습니다.",
                "date": "2025. 12. 23. 오후 2:30:45"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766500000010,
        "fundingId":  1,
        "title": "반려동물 겨울 건강 관리",
        "content": "겨울철에는 반려동물도 감기 걸리기 쉽다고 하네요. 어떻게 관리하시나요?",
        "category": "free",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766500001001,
                "author": "db99817",
                "text": "외출 후 발과 몸을 따뜻하게 해주는 게 좋다고 들었어요.",
                "date": "2025. 12. 23. 오후 3:00:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000001,
        "fundingId":  1,
        "title": "반려동물 보험 가입 후기",
        "content": "최근에 반려동물 보험에 가입했는데, 예상보다 간단하게 가입할 수 있더라구요. 참고로 제가 선택한 상품은 OOO보험입니다.",
        "category": "info",
        "author": "db99817",
        "views": 25,
        "comments": [
            {
                "id": 1766510000101,
                "author": "hongjegue",
                "text": "보험 비교할 때 주의할 점이 있나요?",
                "date": "2025. 12. 23. 오전 10:15:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000002,
        "fundingId":  1,
        "title": "고양이 예방접종 일정",
        "content": "고양이 예방접종 스케줄을 정리했습니다. 참고로 생후 8주부터 시작하면 좋다고 하네요.",
        "category": "info",
        "author": "hongjegue",
        "views": 18,
        "comments": [
            {
                "id": 1766510000201,
                "author": "db99817",
                "text": "좋아요, 저도 캘린더에 기록해놔야겠네요.",
                "date": "2025. 12. 23. 오전 11:00:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000003,
        "fundingId":  1,
        "title": "강아지 털 엉킴 방지 방법",
        "content": "털이 많이 나는 견종이라 엉킴이 심한데, 정기적인 빗질과 털 관리가 필수입니다. 추천 브러시도 공유합니다.",
        "category": "info",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766510000301,
                "author": "hongjegue",
                "text": "저희 강아지도 같은 브러시 쓰는데 효과 좋더라구요.",
                "date": "2025. 12. 23. 오후 12:05:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000004,
        "fundingId":  1,
        "title": "애완동물 전용 카페 추천",
        "content": "최근 다녀온 애완동물 동반 카페를 공유합니다. 분위기 좋고 위생 상태도 깔끔했습니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 17,
        "comments": [
            {
                "id": 1766510000401,
                "author": "db99817",
                "text": "저도 가보고 싶네요! 위치 공유 가능할까요?",
                "date": "2025. 12. 23. 오후 12:30:45"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000005,
        "fundingId":  1,
        "title": "반려동물 전용 여행용품",
        "content": "여행 갈 때 유용한 반려동물 용품을 정리했습니다. 이동가방과 휴대용 물병 추천!",
        "category": "info",
        "author": "db99817",
        "views": 19,
        "comments": [
            {
                "id": 1766510000501,
                "author": "hongjegue",
                "text": "저도 여행 갈 때 이 제품 쓰고 있어요, 편리합니다.",
                "date": "2025. 12. 23. 오후 1:00:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000006,
        "fundingId":  1,
        "title": "겨울철 반려동물 건강 관리",
        "content": "겨울철에는 체온 유지가 중요합니다. 옷이나 담요 등으로 보호해주는 것이 좋습니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 21,
        "comments": [
            {
                "id": 1766510000601,
                "author": "db99817",
                "text": "맞아요, 우리 집 강아지도 겨울에는 외출 후 몸을 잘 닦아줘야 해요.",
                "date": "2025. 12. 23. 오후 1:30:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000007,
        "fundingId":  1,
        "title": "강아지 산책 시간 팁",
        "content": "아침보다 오후가 좋은 이유와 주의할 점을 정리했습니다. 더운 날씨에는 물을 꼭 챙기세요.",
        "category": "info",
        "author": "db99817",
        "views": 16,
        "comments": [
            {
                "id": 1766510000701,
                "author": "hongjegue",
                "text": "좋은 정보네요! 우리 강아지도 오후에 산책하곤 합니다.",
                "date": "2025. 12. 23. 오후 2:00:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000008,
        "fundingId":  1,
        "title": "고양이 식단 조절 방법",
        "content": "고양이 비만 예방을 위해 사료 양을 조절하고 간식은 최소화하는 것이 중요합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766510000801,
                "author": "db99817",
                "text": "저희 고양이도 간식 줄이는 중인데 점점 적응하네요.",
                "date": "2025. 12. 23. 오후 2:30:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000009,
        "fundingId":  1,
        "title": "반려동물 목욕 빈도",
        "content": "강아지와 고양이의 목욕 주기를 정리했습니다. 너무 자주 하면 피부가 건조해질 수 있어요.",
        "category": "info",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766510000901,
                "author": "hongjegue",
                "text": "저희는 2주에 한 번 정도 목욕 시킵니다.",
                "date": "2025. 12. 23. 오후 3:00:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766510000010,
        "fundingId":  1,
        "title": "강아지 배변 훈련 팁",
        "content": "배변 훈련 성공률을 높이는 팁을 정리했습니다. 일정한 시간과 장소가 중요합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 22,
        "comments": [
            {
                "id": 1766510001001,
                "author": "db99817",
                "text": "좋아요, 저도 참고해서 훈련 중입니다.",
                "date": "2025. 12. 23. 오후 3:30:05"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000001,
        "fundingId":  1,
        "title": "반려동물 건강검진 주기",
        "content": "강아지와 고양이는 건강검진을 1년에 한 번씩 받는 것이 좋다고 합니다. 예방 차원에서 필수입니다.",
        "category": "info",
        "author": "db99817",
        "views": 20,
        "comments": [
            {
                "id": 1766511000101,
                "author": "hongjegue",
                "text": "정기검진 덕분에 저희 강아지 질병을 빨리 발견했어요.",
                "date": "2025. 12. 23. 오후 4:00:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000002,
        "fundingId":  1,
        "title": "겨울철 반려동물 피부 관리",
        "content": "건조한 겨울에는 피부 보습이 중요합니다. 전용 보습제 사용을 추천합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 18,
        "comments": [
            {
                "id": 1766511000201,
                "author": "db99817",
                "text": "저희 고양이 피부가 건조해서 보습제를 사용하고 있어요.",
                "date": "2025. 12. 23. 오후 4:20:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000003,
        "fundingId":  1,
        "title": "강아지 산책 장비 추천",
        "content": "하네스, 리드줄, 야간 반사띠 등 안전하게 산책할 수 있는 장비를 소개합니다.",
        "category": "info",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766511000301,
                "author": "hongjegue",
                "text": "야간 산책할 때 반사띠 꼭 필요하죠, 추천 감사합니다!",
                "date": "2025. 12. 23. 오후 4:45:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000004,
        "fundingId":  1,
        "title": "고양이 스트레스 해소 방법",
        "content": "캣타워, 숨숨집, 장난감 등으로 고양이 스트레스를 줄여줄 수 있어요. 환경 변화도 중요합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766511000401,
                "author": "db99817",
                "text": "저희 집 고양이는 캣타워 덕분에 스트레스가 많이 줄었어요.",
                "date": "2025. 12. 23. 오후 5:10:05"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000005,
        "fundingId":  1,
        "title": "반려동물 영양제 선택",
        "content": "연령별로 필요한 영양제가 다르니, 수의사 상담 후 선택하는 것이 좋습니다.",
        "category": "info",
        "author": "db99817",
        "views": 16,
        "comments": [
            {
                "id": 1766511000501,
                "author": "hongjegue",
                "text": "저희 강아지는 관절 영양제를 먹이고 있어요, 효과가 좋습니다.",
                "date": "2025. 12. 23. 오후 5:30:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000006,
        "fundingId":  1,
        "title": "겨울철 외출 시 반려동물 옷 추천",
        "content": "추운 날씨에는 외투나 조끼로 체온을 유지해주는 것이 좋아요. 소재와 사이즈도 중요합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 21,
        "comments": [
            {
                "id": 1766511000601,
                "author": "db99817",
                "text": "저희 강아지에게도 따뜻한 조끼 입히고 있어요.",
                "date": "2025. 12. 23. 오후 6:00:05"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000007,
        "fundingId":  1,
        "title": "강아지 털 냄새 제거 팁",
        "content": "집 안에서 나는 강아지 털 냄새를 줄이는 방법과 세정제를 추천합니다.",
        "category": "info",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766511000701,
                "author": "hongjegue",
                "text": "저도 같은 세정제를 쓰는데 효과 좋아요.",
                "date": "2025. 12. 23. 오후 6:25:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000008,
        "fundingId":  1,
        "title": "고양이 화장실 청결 유지 방법",
        "content": "모래를 자주 교체하고, 배변판 청소를 규칙적으로 하는 것이 중요합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766511000801,
                "author": "db99817",
                "text": "저희 집도 하루 2회 청소하고 있어요, 냄새가 거의 없네요.",
                "date": "2025. 12. 23. 오후 6:50:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000009,
        "fundingId":  1,
        "title": "반려동물 건강식 레시피",
        "content": "강아지용 건강식을 집에서 만들어보았습니다. 재료는 닭가슴살, 야채, 고구마 등입니다.",
        "category": "info",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766511000901,
                "author": "hongjegue",
                "text": "저도 만들어봤는데 강아지가 잘 먹더라구요!",
                "date": "2025. 12. 23. 오후 7:10:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766511000010,
        "fundingId":  1,
        "title": "반려동물 사진 촬영 팁",
        "content": "실내에서 반려동물 사진 찍을 때 조명과 카메라 각도 팁을 공유합니다. 자연스러운 표정이 중요합니다.",
        "category": "info",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766511001001,
                "author": "db99817",
                "text": "좋아요, 다음에 사진 찍을 때 참고해야겠네요.",
                "date": "2025. 12. 23. 오후 7:30:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000001,
        "fundingId":  1,
        "title": "강아지 배변 훈련 질문",
        "content": "배변 훈련 중인데, 밤마다 실수합니다. 어떻게 하면 밤에도 잘 가르칠 수 있을까요?",
        "category": "qna",
        "author": "db99817",
        "views": 25,
        "comments": [
            {
                "id": 1766520000101,
                "author": "hongjegue",
                "text": "밤에는 배변 시간을 미리 맞춰서 화장실로 데려가는 게 좋습니다.",
                "date": "2025. 12. 23. 오후 8:00:00"
            },
            {
                "id": 1766520000102,
                "author": "db99817",
                "text": "좋아요, 시도해봐야겠네요!",
                "date": "2025. 12. 23. 오후 8:05:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000002,
        "fundingId":  1,
        "title": "고양이 긁는 습관 질문",
        "content": "우리 고양이가 가구를 긁어요. 스크래처 사용을 어떻게 유도할 수 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 18,
        "comments": [
            {
                "id": 1766520000201,
                "author": "db99817",
                "text": "스크래처 근처에 캣닢을 뿌리면 관심을 가질 수 있어요.",
                "date": "2025. 12. 23. 오후 8:30:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000003,
        "fundingId":  1,
        "title": "강아지 분리불안 해결 방법",
        "content": "혼자 있을 때 강아지가 짖고 울어요. 분리불안을 어떻게 줄일 수 있을까요?",
        "category": "qna",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766520000301,
                "author": "hongjegue",
                "text": "짧게 집을 비우면서 점차 시간을 늘려보세요. 효과가 있었습니다.",
                "date": "2025. 12. 23. 오후 9:00:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000004,
        "fundingId":  1,
        "title": "고양이 사료 추천 질문",
        "content": "알레르기가 있는 고양이에게 적합한 사료가 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766520000401,
                "author": "db99817",
                "text": "수의사 상담 후 제한 성분 사료를 추천받는 게 안전합니다.",
                "date": "2025. 12. 23. 오후 9:30:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000005,
        "fundingId":  1,
        "title": "강아지 목욕 주기 질문",
        "content": "우리 강아지를 너무 자주 목욕시키는 것 같아요. 적정 주기는 어떻게 되나요?",
        "category": "qna",
        "author": "db99817",
        "views": 16,
        "comments": [
            {
                "id": 1766520000501,
                "author": "hongjegue",
                "text": "견종마다 다르지만, 보통 2~4주 주기가 적당합니다.",
                "date": "2025. 12. 23. 오후 10:00:05"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000006,
        "fundingId":  1,
        "title": "고양이 털 엉킴 해결 질문",
        "content": "털이 많이 나는 고양이를 어떻게 관리해야 엉킴을 줄일 수 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766520000601,
                "author": "db99817",
                "text": "매일 부드럽게 빗질하면 엉킴이 많이 줄어듭니다.",
                "date": "2025. 12. 23. 오후 10:30:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000007,
        "fundingId":  1,
        "title": "강아지 사회화 훈련 질문",
        "content": "강아지가 다른 강아지와 잘 어울리지 못해요. 사회화 훈련 방법 추천해주세요.",
        "category": "qna",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766520000701,
                "author": "hongjegue",
                "text": "산책 중 다른 강아지를 만나게 하면서 보상을 주는 방법이 효과적입니다.",
                "date": "2025. 12. 23. 오후 11:00:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000008,
        "fundingId":  1,
        "title": "고양이 화장실 냄새 질문",
        "content": "화장실 냄새가 심한데, 관리 방법이 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 22,
        "comments": [
            {
                "id": 1766520000801,
                "author": "db99817",
                "text": "모래를 자주 교체하고, 배변판을 깨끗이 청소하면 냄새가 줄어듭니다.",
                "date": "2025. 12. 23. 오후 11:30:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000009,
        "fundingId":  1,
        "title": "강아지 간식 주기 질문",
        "content": "강아지에게 하루에 간식을 몇 번 주는 것이 적당할까요?",
        "category": "qna",
        "author": "db99817",
        "views": 17,
        "comments": [
            {
                "id": 1766520000901,
                "author": "hongjegue",
                "text": "간식은 하루 1~2회 정도가 적당하고, 사료량에 맞춰 조절하세요.",
                "date": "2025. 12. 23. 오후 11:55:00"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766520000010,
        "fundingId":  1,
        "title": "고양이 스트레스 행동 질문",
        "content": "최근 고양이가 갑자기 울고 숨는 행동을 합니다. 스트레스 때문일까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766520001001,
                "author": "db99817",
                "text": "환경 변화나 소음 등 스트레스 요인이 있을 수 있어요. 관찰 후 필요하면 수의사 상담 추천합니다.",
                "date": "2025. 12. 24. 오전 12:20:12"
            }
        ],
        "date": "2025. 12. 23."
    },
    {
        "id": 1766521000011,
        "fundingId":  1,
        "title": "강아지 분리불안 질문",
        "content": "집을 비울 때 강아지가 짖거나 울어요. 분리불안을 완화할 방법이 있을까요?",
        "category": "qna",
        "author": "db99817",
        "views": 23,
        "comments": [
            {
                "id": 1766521001101,
                "author": "hongjegue",
                "text": "조금씩 집을 비우는 시간을 늘려주고, 장난감으로 분산시키면 도움이 돼요.",
                "date": "2025. 12. 24. 오전 1:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000012,
        "fundingId":  1,
        "title": "고양이 털 관리 질문",
        "content": "고양이가 많이 털을 흘리는데, 엉킴 없이 관리할 방법이 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 18,
        "comments": [
            {
                "id": 1766521001201,
                "author": "db99817",
                "text": "매일 빗질하고, 브러시 종류도 적절히 바꿔보세요.",
                "date": "2025. 12. 24. 오전 1:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000013,
        "fundingId":  1,
        "title": "강아지 산책 시간 질문",
        "content": "아침보다 오후 산책이 좋다는데 이유가 무엇인가요?",
        "category": "qna",
        "author": "db99817",
        "views": 21,
        "comments": [
            {
                "id": 1766521001301,
                "author": "hongjegue",
                "text": "기온이 안정적이고, 주변 소음이 적은 시간이 좋다고 해요.",
                "date": "2025. 12. 24. 오전 2:00:05"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000014,
        "fundingId":  1,
        "title": "고양이 편식 해결 질문",
        "content": "우리 고양이가 사료를 골라 먹어요. 어떻게 하면 균형 잡힌 식단을 먹일 수 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766521001401,
                "author": "db99817",
                "text": "사료를 조금씩 섞어 주거나, 간식 대신 사료를 보상으로 사용하는 방법이 있어요.",
                "date": "2025. 12. 24. 오전 2:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000015,
        "fundingId":  1,
        "title": "강아지 알러지 질문",
        "content": "최근 강아지가 피부를 자주 긁어요. 알러지일 가능성이 있을까요?",
        "category": "qna",
        "author": "db99817",
        "views": 19,
        "comments": [
            {
                "id": 1766521001501,
                "author": "hongjegue",
                "text": "피부 상태 확인 후 수의사에게 상담하는 것이 가장 안전합니다.",
                "date": "2025. 12. 24. 오전 3:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000016,
        "fundingId":  1,
        "title": "고양이 스트레스 행동 질문",
        "content": "고양이가 갑자기 숨고 울어요. 스트레스 때문일까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 22,
        "comments": [
            {
                "id": 1766521001601,
                "author": "db99817",
                "text": "환경 변화나 소음이 원인일 수 있어요. 관찰 후 필요하면 수의사 상담 추천합니다.",
                "date": "2025. 12. 24. 오전 3:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000017,
        "fundingId":  1,
        "title": "강아지 사회화 질문",
        "content": "강아지가 다른 강아지와 잘 어울리지 못해요. 어떻게 해야 사회성을 길러줄 수 있을까요?",
        "category": "qna",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766521001701,
                "author": "hongjegue",
                "text": "산책 중 다른 강아지를 만나게 하고, 긍정 보상을 주는 방법이 효과적이에요.",
                "date": "2025. 12. 24. 오전 4:00:05"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000018,
        "fundingId":  1,
        "title": "고양이 화장실 문제 질문",
        "content": "최근 고양이가 배변판을 잘 사용하지 않아요. 어떻게 유도할 수 있을까요?",
        "category": "qna",
        "author": "hongjegue",
        "views": 21,
        "comments": [
            {
                "id": 1766521001801,
                "author": "db99817",
                "text": "청결 유지가 중요하고, 화장실 위치도 안정적인 곳으로 바꿔보세요.",
                "date": "2025. 12. 24. 오전 4:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000019,
        "fundingId":  1,
        "title": "강아지 간식 조절 질문",
        "content": "강아지에게 너무 많이 간식을 주는 것 같아요. 하루 적정량은?",
        "category": "qna",
        "author": "db99817",
        "views": 19,
        "comments": [
            {
                "id": 1766521001901,
                "author": "hongjegue",
                "text": "간식은 하루 1~2회 정도, 사료와 함께 칼로리 계산을 해주면 좋아요.",
                "date": "2025. 12. 24. 오전 5:00:05"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766521000020,
        "fundingId":  1,
        "title": "고양이 놀이 방법 질문",
        "content": "고양이가 집에서 심심해해요. 스트레스 풀어줄 놀이 방법 추천 부탁드립니다.",
        "category": "qna",
        "author": "hongjegue",
        "views": 22,
        "comments": [
            {
                "id": 1766521002001,
                "author": "db99817",
                "text": "레이저 포인터나 장난감 낚시대가 효과적이에요.",
                "date": "2025. 12. 24. 오전 5:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000001,
        "fundingId":  1,
        "title": "강아지 간식 리뷰",
        "content": "최근 구매한 강아지 간식, 맛있게 잘 먹네요. 포장도 깔끔하고 배송도 빠릅니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766530000101,
                "author": "hongjegue",
                "text": "저도 주문했는데 기대되네요!",
                "date": "2025. 12. 24. 오전 6:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000002,
        "fundingId":  1,
        "title": "고양이 사료 후기",
        "content": "고양이가 새 사료를 잘 먹네요. 이전보다 활동량도 조금 늘었습니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766530000201,
                "author": "db99817",
                "text": "좋아요, 저희 고양이에게도 한번 시도해봐야겠네요.",
                "date": "2025. 12. 24. 오전 6:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000003,
        "fundingId":  1,
        "title": "반려견 장난감 후기",
        "content": "장난감을 사줬는데 강아지가 하루 종일 가지고 놀아요. 내구성도 괜찮습니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 17,
        "comments": [
            {
                "id": 1766530000301,
                "author": "hongjegue",
                "text": "저희 강아지도 비슷하게 좋아합니다. 추천 감사합니다!",
                "date": "2025. 12. 24. 오전 7:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000004,
        "fundingId":  1,
        "title": "애완동물 카페 방문 후기",
        "content": "최근 방문한 애완동물 동반 카페, 분위기가 좋고 위생 상태도 만족스러웠습니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 16,
        "comments": [
            {
                "id": 1766530000401,
                "author": "db99817",
                "text": "위치 정보 공유해주시면 감사하겠습니다!",
                "date": "2025. 12. 24. 오전 7:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000005,
        "fundingId":  1,
        "title": "강아지 배변패드 후기",
        "content": "패드를 새로 구매했는데 흡수력이 좋아서 깔끔하게 사용 가능합니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 19,
        "comments": [
            {
                "id": 1766530000501,
                "author": "hongjegue",
                "text": "저희도 흡수력 때문에 선택했는데 만족합니다.",
                "date": "2025. 12. 24. 오전 8:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000006,
        "fundingId":  1,
        "title": "고양이 장난감 후기",
        "content": "고양이가 새 장난감을 아주 좋아합니다. 튼튼하고 안전해 보여요.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 21,
        "comments": [
            {
                "id": 1766530000601,
                "author": "db99817",
                "text": "저희 집 고양이도 좋아할 것 같네요. 참고하겠습니다!",
                "date": "2025. 12. 24. 오전 8:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000007,
        "fundingId":  1,
        "title": "반려동물용 담요 후기",
        "content": "겨울철에 사용하려고 구매한 담요, 부드럽고 따뜻해서 강아지가 좋아합니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766530000701,
                "author": "hongjegue",
                "text": "저희도 담요 구매 고려 중인데 도움이 되네요.",
                "date": "2025. 12. 24. 오전 9:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000008,
        "fundingId":  1,
        "title": "애완동물 사료 배달 후기",
        "content": "사료 배달 서비스 이용해봤는데, 빠르고 안전하게 배송되었습니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766530000801,
                "author": "db99817",
                "text": "배송 속도 좋네요. 저도 이용해봐야겠습니다.",
                "date": "2025. 12. 24. 오전 9:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000009,
        "fundingId":  1,
        "title": "강아지 의류 후기",
        "content": "겨울용 강아지 옷, 사이즈가 딱 맞고 소재도 좋아서 만족스럽습니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766530000901,
                "author": "hongjegue",
                "text": "저희 강아지도 입혀보고 싶네요!",
                "date": "2025. 12. 24. 오전 10:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766530000010,
        "fundingId":  1,
        "title": "고양이 간식 후기",
        "content": "고양이가 새 간식을 너무 좋아합니다. 재구매 의사 있습니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766530001001,
                "author": "db99817",
                "text": "좋아요, 저희도 다음에 주문해봐야겠네요.",
                "date": "2025. 12. 24. 오전 10:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000011,
        "fundingId":  1,
        "title": "강아지 장난감 리뷰",
        "content": "구매한 장난감, 튼튼하고 강아지가 오래 가지고 놀아요. 만족합니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 21,
        "comments": [
            {
                "id": 1766531001101,
                "author": "hongjegue",
                "text": "저희 강아지도 좋아할 것 같아요, 참고 감사합니다!",
                "date": "2025. 12. 24. 오전 11:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000012,
        "fundingId":  1,
        "title": "고양이 캣타워 후기",
        "content": "캣타워 설치했는데 고양이가 바로 올라가서 놀아요. 튼튼하고 안전해요.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766531001201,
                "author": "db99817",
                "text": "저희 고양이도 설치해볼까 고민 중입니다.",
                "date": "2025. 12. 24. 오전 11:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000013,
        "fundingId":  1,
        "title": "강아지 배변패드 후기",
        "content": "흡수력이 좋아서 하루 종일 깔끔하게 사용 가능합니다. 추천합니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 18,
        "comments": [
            {
                "id": 1766531001301,
                "author": "hongjegue",
                "text": "저도 흡수력 때문에 선택했는데 만족스러워요.",
                "date": "2025. 12. 24. 오후 12:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000014,
        "fundingId":  1,
        "title": "애완동물 미용 후기",
        "content": "이번에 미용시켰는데 털이 부드럽고 향도 좋아요. 서비스 만족합니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766531001401,
                "author": "db99817",
                "text": "저도 미용 예약 고려 중이에요, 참고 감사합니다.",
                "date": "2025. 12. 24. 오후 12:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000015,
        "fundingId":  1,
        "title": "강아지 옷 후기",
        "content": "겨울철 옷, 사이즈가 잘 맞고 보온성도 좋아서 만족합니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766531001501,
                "author": "hongjegue",
                "text": "저희 강아지 사이즈랑 비슷해서 참고할게요.",
                "date": "2025. 12. 24. 오후 1:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000016,
        "fundingId":  1,
        "title": "고양이 장난감 후기",
        "content": "새 장난감, 고양이가 잘 가지고 놀아요. 재질도 안전해 보여서 안심입니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766531001601,
                "author": "db99817",
                "text": "저희 고양이도 좋아할 것 같네요!",
                "date": "2025. 12. 24. 오후 1:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000017,
        "fundingId":  1,
        "title": "반려동물 담요 후기",
        "content": "부드럽고 따뜻해서 겨울철 강아지에게 좋습니다. 사이즈도 넉넉해요.",
        "category": "feedback",
        "author": "db99817",
        "views": 21,
        "comments": [
            {
                "id": 1766531001701,
                "author": "hongjegue",
                "text": "저희도 구매 고민 중인데 참고가 되네요.",
                "date": "2025. 12. 24. 오후 2:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000018,
        "fundingId":  1,
        "title": "애완동물 사료 후기",
        "content": "사료 배달 서비스 이용했는데, 빠르고 안전하게 도착했습니다. 맛도 좋아하는 것 같아요.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 20,
        "comments": [
            {
                "id": 1766531001801,
                "author": "db99817",
                "text": "배송 속도 좋네요. 저도 주문해봐야겠어요.",
                "date": "2025. 12. 24. 오후 2:30:12"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000019,
        "fundingId":  1,
        "title": "강아지 간식 후기",
        "content": "간식을 새로 줬는데 강아지가 너무 좋아하네요. 재구매 의사 있습니다.",
        "category": "feedback",
        "author": "db99817",
        "views": 22,
        "comments": [
            {
                "id": 1766531001901,
                "author": "hongjegue",
                "text": "저희도 다음에 주문해봐야겠네요!",
                "date": "2025. 12. 24. 오후 3:00:00"
            }
        ],
        "date": "2025. 12. 24."
    },
    {
        "id": 1766531000020,
        "fundingId":  1,
        "title": "고양이 사료 후기",
        "content": "새 사료, 고양이가 잘 먹습니다. 포장과 배송도 만족스럽습니다.",
        "category": "feedback",
        "author": "hongjegue",
        "views": 19,
        "comments": [
            {
                "id": 1766531002001,
                "author": "db99817",
                "text": "좋아요, 저도 다음에 주문해봐야겠네요.",
                "date": "2025. 12. 24. 오후 3:30:12"
            }
        ],
        "date": "2025. 12. 24."
    }

];

export default postList;