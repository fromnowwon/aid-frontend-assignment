# AID CLASS TIMETABLE

이 페이지에서는 수업 시간표를 설정하고, 사용자에게 운영시간을 안내합니다.

## 주요 기능

- **시간표 확인:** 메인 페이지에서 시간표를 확인할 수 있습니다.
- **시간표 관리:** 각 교실의 시간표를 추가하고 수정할 수 있습니다.

## 설치 및 실행 방법

1. 패키지를 설치합니다.

```bash
npm install
```

2. 개발 서버 실행 (클라이언트 및 서버 동시 실행됩니다)

```bash
npm run dev
```

3. 웹 브라우저에서 `http://localhost:3000`을 엽니다.

## 사용 기술

- **프론트엔드:** React.js, TypeScript
- **백엔드:** Express
- **데이터베이스:** lowdb
- **상태 관리**: Zustand
- **UI 프레임워크**: Tailwind CSS, Shadcn UI

## 폴더 및 파일 구조

```plaintext
FRONTEND_과제_정채원/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Classroom/
│   │   ├── Header/
│   │   ├── MealTime/
│   │   ├── Modals/
│   │   ├── layout/
│   │   └── ui/
│   ├── lib/
│   │   ├── api.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Home/
│   │   ├── Timetble/
│   ├── store/
│   │   ├── useClassroomStore.ts
│   │   └── useMealTimeStore.ts
│   ├── types/
│   │   ├── ClassroomTypes.ts
│   │   ├── MealTimeType.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
├── db.json
├── server.js
├── README.md
└── ...
```

- **components/**: UI 구성 요소
- **lib/**: api, 재사용 함수 등
- **pages/**: 페이지 컴포넌트
- **store/**: 상태 관리 관련 코드
- **types/**: 타입 정의 파일
- **db.json**: `lowdb`를 사용하여 교실, 세션 등 관련 데이터를 저장하고 관리
- **server.js**: Express.js를 사용하여 API 서버 구현

## 고도화

- '모든 교실 동일 시간표 적용' 스위치 방식에서 버튼으로 변경
  - 한 번 일괄 적용 되고 나면, 다시 활성화 되어 반복 적용 가능합니다.
- 교시 추가, 시간 변경, 모든 교실 동일 시간표 적용 클릭 시에도 모달 노출
  - 시각적으로 현재 작업의 중요성을 강조할 수 있습니다.
  - 사용자 인터페이스에서 수정 작업을 별도의 모달로 분리함으로써, 사용자는 수정 작업에 필요한 부분만 집중해서 볼 수 있습니다.
- 시간표를 확인할 수 있는 페이지('/')를 추가
- 시간 설정 시, 유효성 체크하여 안내 문구를 노출
- 각 시간대마다 최대 5개 추가 가능하며, 이미 5개의 수업이 있는 경우 추가 버튼은 비활성화 됩니다.
- 식사 시간은 점심과 저녁 범위를 지정하여 그 범위 내에서만 적용할 수 있도록 하였습니다. 또한 모든 세션과 중복되지 않는 범위 내에서 지정 가능합니다.
- Mock DB 생성하여 관리

## 기타

- API 서버와 클라이언트 서버는 서로 다른 포트에서 실행되며, npm run dev 명령어로 동시에 실행할 수 있습니다.
- API 서버와 클라이언트 서버가 서로 통신할 수 있도록 CORS 설정이 필요할 수 있습니다.
