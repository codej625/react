# Linking & Navigating

<br />
<br />

* 페이지 간 링크를 생성하는 방법에 대해
---

```
Next.js는 페이지 간 네비게이션을 위해 Link 컴포넌트를 제공한다.

하지만 더 복잡한 네비게이션이 필요한 경우에는 useRouter 훅을 사용할 수 있다.
```

<br />
<br />
<br />
<br />

1. Link 컴포넌트 사용하기

```
Next.js의 <Link> 컴포넌트는 HTML의 <a> 태그를 확장하여,
클라이언트 사이드 내비게이션과 페이지 전환을 효율적으로 처리하는 기능을 제공한다.

주요 기능으로는,
1) 페이지 전환 시 데이터 미리 가져오기(prefetch)
2) 스크롤 위치 관리
3) URL 히스토리 관리
등이 있다.
```

```ts
// 기본 사용

import Link from 'next/link';

export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>;
}
```

<br />
<br />
<br />

2. 동적 라우트 링크 만들기

```
동적 라우트로 이동할 때는,
템플릿 리터럴을 사용하여 동적으로 경로를 생성할 수 있다.
```

```ts

interface Post {
  id: number;
  title: string;
  slug: string;
}

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  );
}
```

<br />
<br />
<br />

3. 활성 링크 확인

```
현재 경로가 링크와 일치하는지 확인하여,
활성화된 링크에 클래스를 추가할 수 있다.
```

```ts
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function Links() {
  const pathname = usePathname();

  return (
    <nav>
      <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
        Home
      </Link>
      <Link className={`link ${pathname === '/about' ? 'active' : ''}`} href="/about">
        About
      </Link>
    </nav>
  );
}
```

<br />
<br />
<br />

4. 해시 링크로 특정 요소로 스크롤하기

```
href에 해시(#)를 추가하여,
페이지 내 특정 ID로 스크롤할 수 있다.
```

```ts
<Link href="/dashboard#settings">
  Settings
</Link>
```

<br />
<br />
<br />
<br />

* 주요 속성
---

1. href

```
href 속성은 링크의 대상 URL을 지정한다.
(필수 속성)
```

```ts
<Link href="/about">
  About
</Link>
```

<br />
<br />

2. replace

```
replace 속성은 URL을 변경할 때,
브라우저의 히스토리 스택에 새로운 항목을 추가하는 대신 현재 항목을 대체한다.
(기본값은 false)
```

```ts
<Link href="/dashboard" replace>
  Dashboard
</Link>
```

<br />
<br />

3. scroll

```
scroll 속성은 페이지 전환 후 스크롤 위치를 어떻게 처리할지 결정한다.
기본값은 true이며, 새 페이지가 보이지 않으면 자동으로 페이지 상단으로 스크롤된다.
```

```ts
<Link href="/dashboard" scroll={false}>
  Dashboard
</Link>
```

<br />
<br />

4. prefetch

```
prefetch는 링크가 사용자 뷰포트에 들어왔을 때,
해당 URL을 백그라운드에서 미리 로드할지 결정한다.

기본값은 null로,
Next.js는 정적 라우트에 대해 전체 페이지를 미리 로드하고,
동적 라우트에는 필요 부분만 미리 로드한다.

1) true 항상 미리 로드
2) false 미리 로드하지 않음
3) null 기본 동작 (정적 라우트는 전체 로드, 동적 라우트는 필요한 부분만 로드)
```

```ts
<Link href="/dashboard" prefetch={false}>
  Dashboard
</Link>
```
