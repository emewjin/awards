# 🏆 메이플스토리 금손어워즈 뷰어

📎 [https://goldhandaward.netlify.app/](https://goldhandaward.netlify.app/)

- [메이플스토리 금손어워즈](https://maplestory.nexon.com/promotion/2021/20210805/AwardsPoll) 투표하려고 보다가 반응형이 아니라서 보기가 힘들어 충동적으로, 급하게 진행하는 토이프로젝트
- 이 프로젝트는 어떠한 이익도 창출하지 않습니다.
- 이 프로젝트에 쓰인 모든 데이터의 저작권은 메이플스토리와 출품작 저작권자에게 있습니다.
- 이 프로젝트의 제작자(?)는 홈페이지가 보기 불편해서 반응형 뷰어만 만들었습니다...

## ✅ 지원하는 기능

- 찜 기능을 지원합니다. db와 서버가 없는 상황에서 영구 저장을 위해 로컬스토리지를 이용하기 때문에 서로 다른 기기와 브라우저에서는 찜 목록이 연동되지 않습니다.
- 작품명을 클릭하면 공식 홈페이지의 해당 작품 상세 페이지로 이동됩니다.
- 작품명과 출품자 이름을 검색할 수 있습니다.

## 타입스크립트 마이그레이션 에러

```
const localWishes = JSON.parse(localStorage.getItem("id"));

Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'.
```

Section.tsx, 14줄
에러 원인 : getItem이 string 또는 null을 리턴하고 있는데 실제 JSON.parse()에 쓰이는 것은 null이 아니라 string이기 때문에 확실히 하라고 에러가 뜸.
해결 :

```js
//#1
const localWishes = JSON.parse(localStorage.getItem("id") || "{}");

//#2
const localWishes = localStorage.getItem("id";
const parsedLocalWishes =
  localWishes === null ? false : JSON.parse(localWishes);
```

https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

## 이벤트 객체 타입 지정

그냥 이벤트에 마우스 커서를 올리면 어떤 타입을 사용해야하는지 알아서 알려줌.
`(JSX attribute) onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined`
https://merrily-code.tistory.com/157
문제 : 이벤트 객체 타입을 지정하고나니까 원래 버튼 태그에는 데이터 속성이 없어서, 에러가 표시되었다.
https://stackoverflow.com/questions/48818162/how-do-i-get-the-typescript-engine-to-allow-custom-html-attributes-in-jsx
https://stackoverflow.com/questions/58634154/react-typescript-get-data-attribute-from-click-event

해결 :

````js
    const target = e.target as HTMLElement;
    const id = target.getAttribute("data-id");
    ```
````

## 리액트 + 타입스크립트 팁

10++ TypeScript Pro tips/patterns with (or without) React
https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9
