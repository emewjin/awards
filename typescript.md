## 타입스크립트 삽질 기록

### 타입스크립트 마이그레이션 에러

```
const localWishes = JSON.parse(localStorage.getItem("id"));

Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'.
```

`Section.tsx`, 14줄
에러 원인 : getItem이 string 또는 null을 리턴하고 있는데 실제 `JSON.parse()`에 쓰이는 것은 null이 아니라 string이기 때문에 확실히 하라고 에러가 뜨는 것~

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

### 이벤트 객체 타입 지정

그냥 이벤트에 마우스 커서를 올리면 어떤 타입을 사용해야하는지 알아서 알려줌.

`(JSX attribute) onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined`

https://merrily-code.tistory.com/157

문제 : 이벤트 객체 타입을 지정하고나니까 원래 버튼 태그에는 데이터 속성이 없어서, 에러가 표시되었다.

- https://stackoverflow.com/questions/48818162/how-do-i-get-the-typescript-engine-to-allow-custom-html-attributes-in-jsx
- https://stackoverflow.com/questions/58634154/react-typescript-get-data-attribute-from-click-event

해결 :

```js
const target = e.target as HTMLElement;
const id = target.getAttribute("data-id");
```

### 리액트 + 타입스크립트 팁

[10++ TypeScript Pro tips/patterns with (or without) React](https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680#78b9)

### 스타일드 컴포넌트 props 타입 적용하기

```tsx
// 인터페이스
interface INav {
  isActive: boolean;
}

// 컴포넌트 상황
<Link to="/info">
  //isActive에서 에러가 뜨는상황 (에러 ts2769)
  <Menu isActive={pathname === "/info"}>정보</Menu>
</Link>

// 스타일드 컴포넌트
const Menu = styled.div<INav>` // <인터페이스>를 태그 옆에 작성
```

문제 : 스타일드 컴포넌트에 넘겨지는 props도 타입 지정이 필요
해결 : 위와 같음
