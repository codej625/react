# Nested Route

<br />
<br />

* 중첩 라우트(Nested Route)에 대해 알아보자.
---

```
중첩 라우트는 여러 URL 세그먼트로 구성된 라우트이다.

예를 들어 /blog/[slug] 라우트는 다음 3개의 세그먼트로 구성된다.

/      (루트 세그먼트)
blog   (세그먼트)
[slug] (리프 세그먼트)
```

<br />
<br />
<br />
<br />

1. 중첩 라우트

```ts
// app/blog/page.tsx
// 예시 "블로그 목록" 페이지 (/blog) 생성

import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'

export default async function Page() {
  const posts = await getPosts()
  
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```

<br />

```ts
// app/blog/[slug]/page.tsx
// 예시 "개별 블로그 포스트" 페이지 (/blog/[slug]) 생성

type Props = {
  params: {
    slug: number;
  };
};

export default function Page({ resource }: Props) {
  return <h1>{`slug -> [ ${resource.slug} ]`}</h1>;
}

// 클라이언트가 "/blog/1" 이런 식으로 경로 요청을 한다면 Path parameter를 사용 가능하다.
```

```
폴더 이름을 대괄호로 감싸면 ([slug])
동적 라우트 세그먼트가 생성된다.
(데이터를 기반으로 여러 페이지를 생성할 때 유용)

ex) 블로그 포스트
    제품 페이지
    사용자 프로필 페이지
```

```
// 폴더 구조 예시

app/
├── page.tsx          // "/" 루트 경로
├── blog/
│   ├── page.tsx      // "/blog" 경로
│   └── [slug]/       // 동적 세그먼트
│       └── page.tsx  // "/blog/1", "/blog/2" 등
```
