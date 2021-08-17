## 타입스크립트 삽질 기록

신기했다.

타입스크립트는 단순히 prop의 타입을 지정해주는 것 뿐만 아니라 '이거 지금 null도 들어올 수 있는데 이 다음 코드는 null이 들어가면 안될거 같은데? 너 괜찮겠어?' 하고 알려주는 역할도 하더라.

그리고 에러메세지도 상당히 구체적이라서 에러메세지만 보고도 감이 잡히는 경우도 있었고 혹시 뭔 말인지 모르겠더라도 에러 코드가 있어서 구글에 검색해보면 자료가 엄청 쏟아졌다.

js를 tsx로 바꾸고 나서 빨간줄이 좍좍 그어지는 것을 보고 자바스크립트가 진짜 관대한 언어라는 것도 새삼 느끼게 되었다.

타입스크립트로 마이그레이션하며 마주한 에러들을 기록한다.

### 로컬스토리지 값 가져오는 부분

```
const localWishes = JSON.parse(localStorage.getItem("id"));

Argument of type 'string | null' is not assignable to parameter of type 'string'. Type 'null' is not assignable to type 'string'.
```

`Section.tsx`, 14줄에서 발생한 에러.

원인 : `getItem`이 string 또는 null을 리턴하고 있는데 실제 `JSON.parse()`에 쓰이는 것은 null이 아니라 string이기 때문에 확실히 하라고 에러가 뜨는 것~

해결 :

```js
//#1
const localWishes = JSON.parse(localStorage.getItem("id") || "{}");

//#2
const localWishes = localStorage.getItem("id";
const parsedLocalWishes =
  localWishes === null ? false : JSON.parse(localWishes);
```

방법은 여러가지가 있었고 null을 처리해줌으로써 해결하는 방법이었다. 출처 :
https://stackoverflow.com/questions/46915002/argument-of-type-string-null-is-not-assignable-to-parameter-of-type-string

### 이벤트 객체 타입 지정

그냥 이벤트에 마우스 커서를 올리면 어떤 타입을 사용해야하는지 알아서 알려줌.

`(JSX attribute) onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined`

https://merrily-code.tistory.com/157

문제 : 이벤트 객체 타입을 지정하고나니까 원래 버튼 태그에는 데이터 속성이 없어서, 에러가 표시되었다.

해결 :

```js
const target = e.target as HTMLElement;
const id = target.getAttribute("data-id");
```

`dataset`으로 값을 가져오던 기존의 방식이 아니라 `getAttribute`를 이용하니 해결되었다.

- https://stackoverflow.com/questions/48818162/how-do-i-get-the-typescript-engine-to-allow-custom-html-attributes-in-jsx
- https://stackoverflow.com/questions/58634154/react-typescript-get-data-attribute-from-click-event

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

원인 : 스타일드 컴포넌트에 넘겨지는 props도 타입 지정이 필요했다

해결 : 위와 같이 인터페이스를 스타일드 컴포넌트 작성할 때 태그 옆에 명시해준다.

### 부모 컴포넌트의 함수를 자식 컴포넌트의 이벤트 핸들러로 등록할 때

문제 상황 : 부모 컴포넌트로부터 props로 받은 함수의 타입을 void로 지정한 후 이벤트 핸들러로 등록하니,

```tsx
interface IProps {
  saveItem: () => void;
  deleteItem: () => void;
}
```

부모 컴포넌트의 props로 함수를 내려주는 부분에서

```js
{
  datas?.map((data) => (
    <Card
      data={data}
      key={data.id}
      saveItem={saveItem} // 🚨
      deleteItem={deleteItem} // 🚨
    />
  ));
}
```

다음과 같은 에러가 발생했다.

```
Type '(e: React.MouseEvent<HTMLButtonElement>) => void' is not assignable to type '() => void'.ts(2322)
```

원인 : 값을 리턴하지 않는 함수라 타입을 void로 지정한거였는데, 알고보니 이벤트 객체를 인자로 쓰고 있는데 그걸 명시해주지 않아서 발생한 에러였다.

해결 : 아래와 같이 타입을 수정해주니 해결되었다.

```tsx
interface IProps {
  saveItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
  deleteItem: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
```

근데 void가 아니라 리액트 이벤트 핸들러로 변경해도 에러가 사라졌다. 동작도 잘 한다. 뭐가 다른거지? 🤔

```tsx
saveItem: React.MouseEventHandler;
deleteItem: React.MouseEventHandler;
```

### array type never => array vs tuple

Without defining the array type, it by default will be never

Type 'never[]' is not assignable to type '[{ author: string; category: string; categoryId: number; id: number; img: string; title: string; }]'.
Target requires 1 element(s) but source may have fewer.ts(2322)

그러니까, 이 배열이 어떤 배열인지 알 수 없다는 뜻인 것 같다. string[]인지, number[]인지...

```js
  datas: [
    {
      author: string;
      category: string;
      categoryId: number;
      id: number;
      img: string;
      title: string;
    }
  ];
```

튜플과 배열
https://stackoverflow.com/questions/63996347/cloning-array-of-objects-in-typescript

```js
// 이건 튜플인데 배열처럼 쓰고 있으니 에러가 난다
  datas: [
    {
      author: string;
      category: string;
      categoryId: number;
      id: number;
      img: string;
      title: string;
    }
  ];
// 그래서 튜플로 정확히 고쳐주어야 한다
  datas: {
    author: string;
    category: string;
    categoryId: number;
    id: number;
    img: string;
    title: string;
  }[];
// 이렇게도 가능
  datas: Array<{
    author: string;
    category: string;
    categoryId: number;
    id: number;
    img: string;
    title: string;
  }>;
```

그랬더니 이번엔 이런 에러가 뜨는데...
Property 'data' is missing in type '{ datas: never[]; loading: boolean; }' but required in type 'IProps'.ts(2741)

IProps에 data가 필수로 있어야 하는데 지금 Section 컴포넌트에 넘겨주는 것 중에 data가 없다는 것이다.

Section 컴포넌트를 먼저 타입스크립트로 변환하는 과정에서 아래 코드의 Card를 map 돌리며 data를 넘기는 과정에서 에러가 났었어서

```js
{
  datas?.map((data) => (
    <Card
      data={data} // 🚨
      key={data.id}
      saveItem={saveItem}
      deleteItem={deleteItem}
    />
  ));
}
```

인터페이스에 data를 추가해서 생긴 문제였다. data는 datas의 요소인데, datas의 타입이 튜플이어야 하는데 배열로 잘못 정의해놨어서 꼬이고 꼬인 문제였다. 이제는 튜플로 정정해서 그런지 data 타입을 삭제해도 에러가 발생하지 않았고 Section 상위 컴포넌트에서도 TS2741 에러가 사라졌다. 넘겨줘야 하는 목록에 data가 아예 없어졌으니까.

[참고한 스택오버플로우 글](https://stackoverflow.com/questions/39908666/property-is-missing-in-type-error)

### useState에 타입을 지정하기

제네릭을 이용한다.
https://velog.io/@velopert/using-hooks-with-typescript

```js
// 전
const [datas, setDatas] = useState([]);

// 후
type Data = {
  author: string;
  category: string;
  categoryId: number;
  id: number;
  img: string;
  title: string;
};

const [datas, setDatas] = useState<Data[]>([]);
```

이쯤되면 궁금해지는 것 : 제네릭과 인터페이스의 차이점은...?

제네릭은 일단 null이나 undefined를 쓸 때 사용한다던데

### 이벤트 객체 타입을 지정했을 때 value나 keycode가 찍히지 않는 이유

https://stackoverflow.com/questions/44321326/property-value-does-not-exist-on-type-eventtarget-in-typescript

event.target here is an HTMLElement which is the parent of all HTML elements, but isn't guaranteed to have the property value. TypeScript detects this and throws the error. Cast event.target to the appropriate HTML element to ensure it is HTMLInputElement which does have a value property:
