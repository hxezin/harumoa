# 하루모아 harumoa
<span>당신의 하루를 모두 모아, 하루모아!</span>
url


## 팀 소개

|김정희|이혜진|이정연|
|:--:|:--:|:--:|
|<img src='https://avatars.githubusercontent.com/u/59546994?v=4' width='100px'/>|<img src='https://avatars.githubusercontent.com/u/102649010?v=4' width='100px'/>||
|[wjdgml3092](https://github.com/wjdgml3092)|[hxezin](https://github.com/hxezin)||
|개발자|개발자|디자이너|
<br/>

## 기술 스택

<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat-square&logo=Typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/styled components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black"/>
  <img src="https://img.shields.io/badge/ReactQuery-FF4154?style=flat-square&logo=ReactQuery&logoColor=white"/>
</div>

<br/>

## 서비스 소개
### 서비스를 만든 계기

평소 기록을 좋아하는 개발자와 디자이너가 웹에서 다이어리와 가계부 관리에 어려움을 겪던 중, 두 가지를 한 번에 작성할 수 있는 서비스를 직접 개발을 하게 됐습니다.

### 기술 스택을 선택한 이유
- **React**

  부드러운 인터렉션으로 사용자 경험을 강조할 수 있는 SPA(Single Page Application)를 구현하기 위해 React를 선택했습니다.
- **TypeScript**
  
  TypeScript를 사용하여 타입을 사전에 지정해서 오류를 최소화하고 개발 속도를 향상시킬 수 있었습니다.
- **Styled-Components**

  인라인 스타일로 정의하는 것이 가독성이 떨어진다고 생각하는 두 개발자가 모였기 때문에, 익숙한 styled-components를 선택했습니다.

- **React Query**

  - 캐싱 처리가 간단하고, 지속적으로 동기화하여 서버 데이터 관리를 효율적으로 하기 위해 React Query를 사용했습니다.
    
  - 복잡한 코드가 필요한 다른 데이터 불러오기 방식과 달리 React Component 내부에서 간단하고 직관적으로 API를 사용할 수 있습니다.
    
  - 저희는 리액트 쿼리를 사용해서 캐싱하여 데이터를 관리하고, API 통신 후 받은 response data를 `queryClient.invalidateQueries(key)`저장한 키값을 넣어 백그라운드에서 API를 재요청하여 데이터를 업데이트하고 업데이트 된게 있다면 UI상으로 바로 보여줬습니다.

<br/>

## 가이드

### 버전

- Node.js 18.13.0
- Npm 9.5.1

### 설치 및 실행

- **설치**

```shell
  $ git clone https://github.com/wjdgml3092/harumoa.git
  $ cd harumoa
```

- **실행**
```shell
  $ npm install
  $ npm run start
```

<br/>

## 기능
### Auth
- firebase google authentication을 사용한 회원가입 없는 SNS 로그인

### 가계부, 일기 작성 및 조회
- 가계부, 일기 한번에 작성
- 캘린더 UI를 사용하여 날짜별로 손쉽게 수입/지출 파악
- 다른 달로 이동 시 오늘 날짜로 돌아오는 기능
- 고정지출, 월별 예상 지출 작성 및 조회
- 현재 달에 해당하는 고정 지출만 조회되도록 필터링

### 커스텀
- 사용자 취향대로 카테고리, 월별 예상 지출 한도, 일간 합계 방식 등 커스텀 가능

### 기타
- 토스트 알림을 통해 사용자에게 즉각적인 피드백을 제공

<br/>

## 화면
|<span>로그인</span>|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/231cb141-1bc5-4c63-84ec-8c6cc0a5a41a'/>|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/879486fb-48a3-4b8b-b20b-a48341eca931'/>|
|---|-------|------|
|메인|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/673a14ee-bdf6-47d9-9311-ae2c1886f7cf'/>|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/3dc95020-557c-4527-bb6f-a95c53ac4dd4'/>|
|고정지출|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/4546469e-28f4-41f6-88e0-141af9c6e329'/>|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/6cb6106f-c780-4302-875a-7e0433e12073'/>|
|작성ㅡ디테일|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/e4a2e92a-aaa1-4ac0-a982-a6383c38a241'/>|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/b64d0a95-9b4b-435f-b18b-37bba2fd16e9'/>|
|설정|<img src='https://github.com/wjdgml3092/harumoa/assets/59546994/4becd8ab-2e4f-455b-842a-f1407526f7fc'/>| <img src='https://github.com/wjdgml3092/harumoa/assets/59546994/eddec7d0-06ef-4958-bac5-d30ba719db85'/>|

<br/>

## 이후 계획
- chart.js 등 차트 라이브러리를 사용하여 월별 소비 분석 시각화
- 다크모드
- 일기작성 시 그날의 감정을 표현하는 기능 추가
- 새로고침/뒤로가기 이벤트 추가(글 작성/수정, 설정 수정 시)
