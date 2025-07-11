# 번들러에 대해 알아보자.

<br />
<br />

* 번들러(bundler)?
---

```
프론트엔드 개발은 모듈 단위로 파일을 엮어서 개발하는 방식이다.

모듈은 서로 의존성을 띄고 있기 때문에 다음과 같은 문제들이 발생한다.

1) 수많은 모듈의 순서를 어떻게 처리 (Dependency)
2) 사용하는 모듈의 증가로 생기는 오버헤드
3) ES6+ 스펙의 코드를 어떻게 처리할 것인가? (호환성)

위 문제들을 해결하기 위해 등장한 것이 바로 모듈 번들러이다.
```

<br />

```
Module(분리된 코드 조각) + Bundler(묶는다) = 모듈 번들러
모듈 번들러는 분리된 코드 조각들을 하나로 병합하는 개발 도구이다.

* 핵심 작업 순서
1) JS 파일, CSS 파일 등 여러 리소스를 하나로 결합하여 단일 파일을 만든다.
2) 브라우저는 하나의 단일 파일을 로드함으로써 애플리케이션이 동작한다.
```

<br />
<br />
<br />
<br />

1. 번들러의 종류

<br />

`Webpack`

```
지금도 지속적으로 업데이트 되고 있는
가장 인기 있는 번들러이다.
```

<br />

`Rollup`

```
애플리케이션 만들 땐 webpack으로,
라이브러리 만들 땐 rollup으로 라는 말이 있을 정도로 어느 정도 입지가 있다.
```

<br />

`ESBuild`

```
Go로 작성되었고,
JS 기반의 번들러보다 10배에서 100배까지 빠른 엄청난 퍼포먼스를 보여준다.
```

<br />

`Vite`

```
차세대 번들러로 불리고 있다.
esbuild로 파일들을 통합하고, rollup을 통해 번들링한다.
```
