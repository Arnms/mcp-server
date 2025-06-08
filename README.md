# MCP Task Server
TypeScript로 구현된 Model Context Protocol (MCP) 서버입니다. 태스크 관리 기능과 계산기 기능을 제공합니다.
기능
고급 태스크 서버 (기본값)

Tools: 태스크 생성, 조회, 완료, 삭제
Resources: 태스크 데이터와 통계에 대한 JSON 리소스
Prompts: 태스크 요약 및 리마인더 프롬프트 템플릿

계산기 서버

Tools: 기본 수학 연산 (덧셈, 곱셈, 나눗셈)

설치
bashnpm install
개발
bash# TypeScript 컴파일
npm run build

# 개발 모드 (고급 태스크 서버)
npm run dev

# 개발 모드 (계산기 서버)
npm run dev:calculator

# 타입 체크와 함께 감시 모드
npm run watch
실행
bash# 프로덕션 모드 (고급 태스크 서버)
npm start

# 계산기 서버
npm run start:calculator

# 또는 환경 변수로 직접 제어
MCP_SERVER_TYPE=calculator npm start
MCP_SERVER_TYPE=advanced npm start
프로젝트 구조
src/
├── index.ts                 # 진입점
├── server/
│   ├── base-server.ts      # 기본 계산기 서버
│   └── advanced-server.ts  # 고급 태스크 서버
├── handlers/
│   ├── tool-handler.ts     # 도구 요청 핸들러
│   ├── resource-handler.ts # 리소스 요청 핸들러
│   └── prompt-handler.ts   # 프롬프트 요청 핸들러
├── services/
│   └── task-service.ts     # 태스크 비즈니스 로직
├── models/
│   ├── task.ts            # 태스크 데이터 모델
│   └── server-config.ts   # 서버 설정 및 스키마
└── types/
    └── index.ts           # TypeScript 타입 정의