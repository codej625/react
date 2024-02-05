# setTimeout을 알아보자!

<br/>


```javascript
setTimeout(); /* 두개의 파라미터를 받는다. */
```

```javascript 
* 첫 번째 파라미터를 함수로 전달할 때는 소괄호를 넣지 않는다. */

const testFn() { /* 1 */
  console.log(^^);
};

setTimeout(() => { /* 2 */
  console.log("^^");
, 2000);
}

setTimeout(function({ /* 3 */
  console.log("^^");
});
setTimeout(testFn, 2000); /* 두번째 파라미터는 로직을 기다렸다 작동하는 시간이다. */
```
