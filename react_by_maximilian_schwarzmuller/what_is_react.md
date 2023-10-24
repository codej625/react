# 리액트란 무엇인가?

```
리액트는 웹 및 네이티브 사용자를 위한 인터페이스 라이브러리이다.
다시 말해, 리액트는 사용자 인터페이스 구축을 위한 자바스크립트 라이브러리이다.
```

<br/>

## 그럼 왜 리액트를 사용해야 하는가?
```
리액트는 기본적으로 CSR(Client Side Rendering) 렌더링을 사용한다.
서버에서 새 페이지를 받을 때까지 기다릴 필요가 없으므로 로딩 없는
부드러운 화면을 구현할 수 있다.

하지만 결국 리액트는 자바스크립트의 라이브러리이다.
자바스크립트로 코드를 만들면 될 텐데 왜 리액트를 사용해야 하는 것일까?

이유는 간단하다.
CSR 렌더링을 하며 SPA(Single Page Application)를 구현하려면,
굉장히 손이 많이 가고 번거로우며 그 과정에서 오류가 발생할 확률도 높아지기 때문이다.
그래서 우리는 리액트를 사용하는 것이다.
```

```
리액트는 HTML에서 javascript를 불러오는게 아니라 동적인 코드가 HTML코드에 섞여 있는 형태이다.

React와 HTML+javascript의 차이를 예시를 보며 살펴보자
```

<br/>

ex) HTML + javascript code
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Vanilla JavaScript</title>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="styles.css" />
    <script src="index.js" defer></script>
  </head>

  <body>
    <header>
      <img src="js-logo-xs.png" alt="JavaScript logo" />
      <div>
        <h1>Vanilla JavaScript</h1>
        <p>i.e., JavaScript without any (UI) framework or library</p>
      </div>
    </header>

    <div id="tabs">
      <menu>
        <button id="btn-why-react" class="active">Why React?</button>
        <button id="btn-core-features">Core Features</button>
        <button id="btn-resources">Related Resources</button>
      </menu>
      <div id="tab-content"></div>
    </div>
  </body>
</html>
```
```javascript
const content = [
  [
    "React is extremely popular",
    "It makes building complex, interactive UIs a breeze",
    "It's powerful & flexible",
    "It has a very active and versatile ecosystem"
  ],
  [
    "Components, JSX & Props",
    "State",
    "Hooks (e.g., useEffect())",
    "Dynamic rendering"
  ],
  [
    "Official web page (react.dev)",
    "Next.js (Fullstack framework)",
    "React Native (build native mobile apps with React)"
  ]
];

const btnWhyReact = document.getElementById("btn-why-react");
const btnCoreFeature = document.getElementById("btn-core-features");
const btnResources = document.getElementById("btn-resources");
const tabContent = document.getElementById("tab-content");

function displayContent(items) {
  let listContent = "";
  for (const item of items) {
    listContent += `<li>${item}</li>`;
  }
  const list = document.createElement("ul");
  tabContent.innerHTML = ""; // clear existing content
  list.innerHTML = listContent; // insert new content
  tabContent.append(list);
}

function highlightButton(btn) {
  // Clear all existing styling / highlights
  btnWhyReact.className = "";
  btnCoreFeature.className = "";
  btnResources.className = "";
  btn.className = "active"; // set new style / highlight
}

function handleClick(event) {
  const btnId = event.target.id;
  highlightButton(event.target);
  if (btnId === "btn-why-react") {
    displayContent(content[0]);
  } else if (btnId === "btn-core-features") {
    displayContent(content[1]);
  } else {
    displayContent(content[2]);
  }
}

displayContent(content[0]); // initially show this content

btnWhyReact.addEventListener("click", handleClick);
btnCoreFeature.addEventListener("click", handleClick);
btnResources.addEventListener("click", handleClick);
```

<br/>

ex) React code
```javascript
const content = [
  [
    "React is extremely popular",
    "It makes building complex, interactive UIs a breeze",
    "It's powerful & flexible",
    "It has a very active and versatile ecosystem"
  ],
  [
    "Components, JSX & Props",
    "State",
    "Hooks (e.g., useEffect())",
    "Dynamic rendering"
  ],
  [
    "Official web page (react.dev)",
    "Next.js (Fullstack framework)",
    "React Native (build native mobile apps with React)"
  ]
];

export default function App() {
  const [activeContentIndex, setActiveContentIndex] = useState(0);

  return (
    <div>
      <header>
        <img src="react-logo-xs.png" alt="React logo" />
        <div>
          <h1>React.js</h1>
          <p>i.e., using the React library for rendering the UI</p>
        </div>
      </header>

      <div id="tabs">
        <menu>
          <button
            className={activeContentIndex === 0 ? "active" : ""}
            onClick={() => setActiveContentIndex(0)}
          >
            Why React?
          </button>
          <button
            className={activeContentIndex === 1 ? "active" : ""}
            onClick={() => setActiveContentIndex(1)}
          >
            Core Features
          </button>
          <button
            className={activeContentIndex === 2 ? "active" : ""}
            onClick={() => setActiveContentIndex(2)}
          >
            Related Resources
          </button>
        </menu>
        <div id="tab-content">
          <ul>
            {content[activeContentIndex].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
```

<br/>

## 명령형? 선언형?
```
자바스크립트 코드는 기본적으로 명령형으로 작성해야 한다.
거쳐야 할 단계를 정의하고 코드를 작성하는 것이다.
그렇기 때문에 무엇을 추가하는 간단한 작업에서도
쉽게 오류가 생길 수 있다.

단계를 정의하는 건 방대한 플랫폼일수록 복잡해지기 때문이다.
```
```
반면 리액트는 거쳐야 할 단계를 정의하지 않는다.
리액트가 알아서 과정을 파악해 필요한 단계를 수행하기 때문이다.
즉, 목표로 하는 UI 상태를 정의할 뿐이다.
그래서 리액트는 선언형으로 작성해야 한다.
```
