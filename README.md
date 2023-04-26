# 초기 설정
npm init
npm install express / npm i express
npm install mongoose

# 디렉토리 구조
.<br>
├── app.js<br>
├── routes<br>
│   ├── index.js<br>
│   ├── comments.js<br>
│   └── posts.js<br>
└── schemas<br>
    ├── index.js<br>
    ├── comment.js<br>
    └── post.js<br>
- 위와 같은 Directory Structure로 서비스를 구현하기
- Middleware를 이용하여 Router를 분리해주세요.

# 기능 구현
1. 전체 게시글 목록 조회 API
    - 제목, 작성자명, 작성 날짜를 조회하기
    - 작성 날짜 기준으로 내림차순 정렬하기
2. 게시글 작성 API
    - 제목, 작성자명, 비밀번호, 작성 내용을 입력하기
3. 게시글 조회 API
    - 제목, 작성자명, 작성 날짜, 작성 내용을 조회하기 
    (검색 기능이 아닙니다. 간단한 게시글 조회만 구현해주세요.)
4. 게시글 수정 API
    - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 수정되게 하기
5. 게시글 삭제 API
    - API를 호출할 때 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제되게 하기
6. 댓글 목록 조회
    - 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있도록 하기
    - 작성 날짜 기준으로 내림차순 정렬하기
7. 댓글 작성
    - 댓글 내용을 비워둔 채 댓글 작성 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글을 추가하기
8. 댓글 수정
    - 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return하기
    - 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
9. 댓글 삭제
    - 원하는 댓글을 삭제하기

# 질문
1. 수정, 삭제 API에서 Resource를 구분하기 위해서 Request를 어떤 방식으로 사용하셨나요? (`param`, `query`, `body`)
2. HTTP Method의 대표적인 4가지는 `GET`, `POST`, `PUT`, `DELETE` 가있는데 각각 어떤 상황에서 사용하셨나요?
3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?
4. 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?