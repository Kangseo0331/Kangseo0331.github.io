---
title: X clone
startDate: 2026-06-29
completionDate: 2026-08-26
tagline:
  - Backend
  - JavaScript
  - Express
  - development
---
# 프로젝트 개요

<aside>

실시간 소셜 네트워크 서비스인 'X(구 트위터)'의 핵심 기능을 클론코딩하는 프로젝트이다. 

</aside>

`개발 기간`  2026.06.29 - 2026.08.26

`개발 인원`  5인

`개발 목표`  이론 학습과 실습을 병행하여 X의 실제 서비스에 가까운 결과물 완성

`개발 배경`  인공지능대학 스프린트 캠프 웹 개발 비기너 divrary

# 기술 스택

**프론트엔드**  `React`

**백엔드** `JavaScript` `Node.js`  `Express`

**DB** `mysql`

**Infra** `Netlify` `Railway`

# 협업 과정

## 협업 진행 방법

- GitHub로 코드 공유
    - branch를 만들어 push
    - pull request 후 최소 1명의 승인을 받아 merge
- 카카오톡 메신저로 소통
    - 발표 준비
    - 역할 분담
    - 마감 기한 및 스케쥴 조정
    - 전체 채팅방과 파트 별 채팅방으로 나눠 소통
- 매주 1회 구글 미팅으로 회의하며 상황 공유
- 노션으로 회의록 및 ERD, API 명세서 공유
- 프론트엔드와 백엔드로 나뉘어 벡엔드가 API와 명세서를 완성하면 이후 프론트엔드가 API 명세서에 따라 개발

# 구현 기능

[인증]

- 회원가입
- 로그인
- JWT 발급

[프로필]

- 내 프로필 조회/수정
- 다른 사용자 프로필 조회
- 계정 공개/비공개 설정

[리스트]

- 리스트 생성/조회/수정/삭제
- 리스트 멤버 추가/삭제/조회

[게시글/답글]

- 게시글 작성/수정/삭제
- 게시글 목록 조회
- 게시글 상세 조회
- 인용 게시글 작성
- 답글 작성/조회/삭제

[팔로우]

- 팔로우/언팔로우
- 팔로워/팔로잉 목록 및 수 조회

[좋아요]

- 좋아요/좋아요 취소
- 좋아요 수 및 여부 조회

[북마크]

- 북마크 저장/취소
- 북마크 목록 조회

[알림]

- 좋아요, 재게시, 답글, 인용, 팔로우 알림 생성
- 행동 취소 시 알림 삭제

[설정]

- 비밀번호 검증
- 비밀번호 변경
- 계정 정보 변경

# 담당 역할

1. DB 설계 초안 작성
    - excel을 이용해 테이블 및 관계 설계의 초안 작성
    - 팀원 분이 피드백을 해주시고 ERD를 작성해주셨다.

1. 인증, 프로필, 리스트, 설정 기능 구현
    - 담당 기능의 API 명세서 작성
    - 백엔드 API 구현

1. ppt 제작
    - 전체 ppt 뼈대와 백엔드 파트의 세부 내용 작성

# 이번 프로젝트로 배운 내용

1. API
    - API의 기능 및 역할
    - API 명세서 작성법
    - URL 주소 + HTTP 메소드
    - RESTful
    - 상태코드
    - json

1. DB
    - SQL 문법 기초: SELECT, JOIN 등
    - 데이터베이스 설계 : 정규화

1. 웹 개발
    - JavaScripts
    - request에 따른 response
    - JWT 토큰
    - 미들웨어

# 기능 시연 및 결과물 링크

### 시연 영상

https://drive.google.com/file/d/1__G128k5CNQlqvjepdDmnKM4GzByrsz8/view?usp=drive_link

### ppt

https://drive.google.com/file/d/1FtMe737Ta7o4ZezhRoQvyYhVG1YH1baj/view?usp=drive_link

### GitHub

https://github.com/2026-Sprint-Camp-project


## 코드 테스트

인라인 코드는 `console.log("Hello")`처럼 표시돼.

```javascript
function hello() {
  console.log("Hello, world!");
}
```


## 프로젝트 주요 기능

- 사용자 기능
  - 회원가입
  - 로그인
  - 프로필 조회
- 게시글 기능
  - 게시글 작성
  - 게시글 수정
    - 제목 수정
    - 내용 수정

## 개발 순서

1. 데이터베이스 설계
2. API 구현
   1. 회원 인증
   2. 게시글 관리
3. 프론트엔드 연동


## 기술 스택

| 구분 | 기술 | 용도 |
|---|---|---|
| Frontend | React | 사용자 인터페이스 |
| Backend | Express | API 서버 |
| Database | MySQL | 데이터 저장 |

## 프로젝트 화면

![메인 페이지](./images/main.png)
