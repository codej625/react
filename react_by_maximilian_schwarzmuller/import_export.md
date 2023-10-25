# import 와 export에 대해 알아보자!

<br/>


import, export에는 여러가지 방법이 있다.

<br/>

1. 자바스크립트 객체로 전체를 import
```javascript
ex) test.js

export default 'dafault test';
export const test1 = 'export test1';
export const test2 = 'export test2';
```
```javascript
import * as obj from './test.js';

console.log('obj.default =>', obj.default);
console.log('obj.test1 =>', obj.test1);
console.log('obj.test2 =>', obj.test2);
```

<br/>

2. 여러개 혹은 하나의 변수를 {}를 사용하여 import
```javascript
ex) test.js

export default 'dafault test';
export const test1 = 'export test1';
export const test2 = 'export test2';
```
```javascript
import { test1, test2 } from './test.js';

console.log('test1 =>', test1);
console.log('test2 =>', test2);
```

<br/>

3. 변수의 이름을 바꿔서 import
```javascript
ex) test.js

export default 'dafault test';
export const test1 = 'export test1';
export const test2 = 'export test2';
```
```javascript
import { test1, test2 as test3 } from './test.js';

console.log('test1 =>', test1);
console.log('test3 =>', test3);
```

<br/>

4. default 값을 import
```javascript
ex) test.js

export default 'dafault test';
```
```javascript
import test from './test.js';

console.log('test =>', test);
```

<br/>

```
default 값은 파일당 하나만 허용되며,
이름이 없는 값이기 때문에 4번 방법처럼 직접 지정해주고 import를 받거나
1번 방법처럼 객체를 받아 사용할 수 있다.
```


