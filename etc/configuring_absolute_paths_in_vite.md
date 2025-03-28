# vite 절대경로 설정

<br />
<br />

```
vite로 빌드하고 있는 프로젝트라면,
vite.config 환경설정 파일에서 절대 경로 설정이 가능하다.
```

<br />
<br />
<br />
<br />

1. vite.config에 내용을 추가
 
```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  /* 추가 되는 부분 예시 */
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@assets", replacement: "/src/assets" },
      { find: "@", replacement: "/src" },
    ],
  },
});
```

```
alias 에 배열로, 찾을 경로와 바꿀 경로를 기입한다.

/src/components -> @components으로 변경 된다.
```

<br />
<br />
<br />

2. typescript 사용 시 tsconfig.json파일도 수정

```js
{
  "compilerOptions": {
    ...{options},
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@/*": ["src/*"]
    }
  },
  "include": ["src", "**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

<br />

```javascript
이제 import 시,
import Webtoon from '@components/pages/Webtoon.tsx';
이런식으로 깔끔한 절대 경로 설정이 가능하다.
```
