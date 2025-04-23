
# YOUTUBE-MUSIC-ORGANIZER

### docs

https://developers.google.com/youtube/v3/docs/playlistItems/list?hl=ko
https://developers.google.com/explorer-help/code-samples?hl=ko#node.js


### Feature

#### 플레이리스트 정렬기능

 - [x] 플레이리스트 불러오기
 - [x] 플레이리스트 내 음악 보기
 - [x] 플레이리스트 내 음악 모두 불러오기
 - [x] 플레이리스트 편집 취소
 - [x] 플레이리스트 항목 삭제
 - [x] 플레이리스트 커스텀으로 정렬하기
 - [x] 플레이리스트 저장 구현
 - [ ] 다른 플레이리스트로 저장 구현

#### 음악 정보 수정

 - [ ] Music 정보 커스텀 할 수 있도록 수정하기
 - [ ] Music 아티스트 별칭 추가하기

#### api 요청 최적화
 - [ ] 플레이리스트 저장 시 api 요청 최적화 전략???
   -> 1. 해당 요청이 반영된 후 순서를 로컬에 한번 반영 후,
   -> 2. 순서 변경이 또 필요하다면 재요청 하는 식으로 로직 변경

#### store persist 설정
 - [x] googleAuthInfo persist 설정 추가 (SSR 고려)
 - [ ] session에서 값을 가져오는 경우 로딩 검증