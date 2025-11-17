# YARN

<br />
<br />

* NPM? YARN?

```
Yarn은 자바스크립트 패키지 관리자이다.

노드(Node.js) 프로젝트에서 사용하는
다양한 패키지들을 쉽게 관리할 수 있도록 도와준다.
(NPM의 대체로 사용)
```

<br />
<br />
<br />
<br />

1. Yarn 설치 및 초기화

```
// npm으로 설치

npm install -g yarn
```

```
// brew으로 설치

brew install yarn
```

```
Chocolatey으로 설치

choco install yarn
```

```
// 버전 확인

yarn --version
```

```
// 초기화

yarn init
```

<br />
<br />
<br />

2. Yarn Install

```
yarn

or

yarn install
```

<br />
<br />
<br />

3. 의존성 설치

```
yarn add [package]
yarn add [package]@[version]
yarn add [package]@[tag]
```

<br />

```
// devDependencies 와 같은 다른 범주의 의존성을 추가하려면

yarn add [package] --dev
yarn add [package] --peer
yarn add [package] --optional
```

<br />
<br />
<br />

4. 의존성 모듈 업그레이드

```
yarn upgrade [package]
yarn upgrade [package]@[version]
yarn upgrade [package]@[tag]
```

<br />
<br />
<br />

5. 의존성 모듈을 제거

```
yarn remove [package]
```

<br />
<br />
<br />
<br />

* yarn.lock
---

```
Yarn.lock 파일은 설치된 모듈의 버전을 저장해,
어디서나 같은 버전과 구조의 의존성을 갖는다.

Yarn에서는 자동으로 yarn install 때 마다 yarn.lock이 생성된다.
(package-lock.json와 같은 역할)
```
