## Google form copycat
구글 설문지(https://docs.google.com/forms)의 기능을 따라 구현해 본 프로젝트이다. React, Redux, Typescript 기반으로 작성되었다.


### Install & Execute
```
git clone https://github.com/tykim5931/Google-form-copycat.git
or
unzip the zip file
```
```
cd minesweeper
npm install
npm start
```

### Program Overview

<img src="https://user-images.githubusercontent.com/67325264/188520677-bfc37392-c3fe-4c6e-a6bf-6ae4120145d1.png"  width="600"/>
<img src="https://user-images.githubusercontent.com/67325264/188521197-badd9aab-240a-485d-8f56-d689725439c5.png"  width="300"/>
<img src="https://user-images.githubusercontent.com/67325264/188521242-68082554-f2c9-461a-a8b3-19fe6922cb27.png"  width="400" />

```
- 설문지 제목을 추가하고 편집할 수 있다.
- 설문지 설명을 추가하고 편집할 수 있다.
- 질문을 추가할 수 있다. 질문은 질문박스의 드롭다운 옵션을 통해 단답,장문,객관식,체크박스,드롭다운 형식을 사용할 수 있다.
- 질문을 복사하고 삭제할 수 있다.
- 여러 옵션이 있는 질문일 경우 옵션을 생성하고 편집, 삭제할 수 있다.
- 필수 질문으로 설정할 수 있다. 미리보기에서, 필수 질문으로 설정된 질문에 답변하지 않으면 답변을 제출할 수 없다. 
- 미리 보기에서 설문지를 미리 보고 답변할 수 있다.
- 미리 보기에서 '제출하기'를 누르면 질문과 답변의 요약을 확인할 수 있다.
- 미리 보기에서 '답변 삭제'를 통해 작성한 답변을 모두 지울 수 있다.
- 편집기에서 '양식 삭제'를 통해 작성한 질문을 모두 삭제할 수 있다.
- 드래그 앤 드랍으로 질문 순서를 변경할 수 있다. 
```

### Tech Stack

[![TypeScript Badge](https://img.shields.io/badge/Typescript-235A97?style=flat-square&logo=Typescript&logoColor=white)]()
[![React Badge](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white)]()
[![Redux Badge](https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=redux&logoColor=white)]()

### Dependencies

```
"@emotion/react": "^11.10.4",
"@emotion/styled": "^11.10.4",
"@mui/material": "^5.10.3",
"@reduxjs/toolkit": "^1.8.5",
"@testing-library/jest-dom": "^5.16.5",
"@testing-library/react": "^13.3.0",
"@testing-library/user-event": "^14.4.3",
"@types/jest": "^27.5.2",
"@types/node": "^17.0.45",
"@types/react": "^18.0.18",
"@types/react-dom": "^18.0.6",
"react": "^18.2.0",
"react-beautiful-dnd": "^13.1.1",
"react-dom": "^18.2.0",
"react-redux": "^8.0.2",
"react-router-dom": "^6.3.0",
"react-scripts": "5.0.1",
"typescript": "^4.8.2",
"web-vitals": "^2.1.4"
"@types/styled-components": "^5.1.26"
```

### Coding Convention

```
[Feat] : 새로운 기능 추가
[Chore] : 버그 수정, 중요도 낮은 기능의 수정 등
[Docs] : 문서 추가 및 변경
[Style] : 코드 포맷팅, 로직의 변화는 없이 띄어쓰기나 탭 문자 등의 사소한 변화
[UI] : 기능상의 변경 없이 UI 요소 수정
```