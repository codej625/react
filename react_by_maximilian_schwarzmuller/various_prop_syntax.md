# 다양한 prop(속성) 구문

<br />

1. 단일 prop 객체 전달(prop 이름은 예시이다.)

```javascript
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}  
  image={CORE_CONCEPTS[0].image}
/>
```

또는

```javascript
<CoreConcept {...CORE_CONCEPTS[0]} />
```

컴포넌트에 하나의 prop를 전달할 수 있다.

```javascript
<CoreConcept concept={CORE_CONCEPTS[0]} />
```

<br /><br />

2. 받은 prop들을 단일 객체로 그룹화

ex) 이런식으로 전달 했을 시,

```javascript
<CoreConcept
  title={CORE_CONCEPTS[0].title}
  description={CORE_CONCEPTS[0].description}  
  image={CORE_CONCEPTS[0].image}
/>
```

밑에와 같이 개별로 prop을 받거나

```javascript
export default function CoreConcept({ title, description, image }) {
  // Use {title}, {description}, {image}
}
```

Rest 문법을 사용하여 단일 객체로 그룹화할 수도 있다.

```javascript
export default function CoreConcept({ ...concept }) { 
  // ...concept groups multiple values into a single object
  // Use concept.title, concept.description etc.
  // Or destructure the concept object: const { title, description, image } = concept;
}
```

<br /><br />

3. prop 기본값 설정

```javascript
export default function Button({ caption, type = "submit" }) { 
  // caption has no default value, type has a default value of "submit" 
}
```

위와 같이 기본값을 설정할 수 있다.

<br /><br />

4. 기타

```javascript
<CoreConcept>text<CoreConcept/>
```

위와 같이 커스텀 컴포넌트로 값을 감싼 후,

```javascript
export default function CoreConcept({ prop }) {
  // Use {prop} prop의 값은 text이다.
}
```

이런식으로 사용도 가능하다.
