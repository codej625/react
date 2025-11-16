# Expo 라우터

<br />
<br />

* 리액트 네이티브에서 라우팅을 하는 방법

---

```
리액트 네이티브에서 라우팅이란,
애플리케이션에서 URL 경로에 따라 다른 컴포넌트를 렌더링 하는 것이다.

여기서는 Expo 프레임워크를 사용하고,
Expo Router를 기준으로 설명하겠다.
```

<br />
<br />
<br />
<br />

1. Link 컴포넌트 (터치 가능한 텍스트/버튼)

```tsx
import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* 텍스트로 이동 */}
      <Link href="/about">
        <Text style={{ color: 'blue', fontSize: 18 }}>About 페이지로 이동</Text>
      </Link>
    </View>
  );
}
```

<br />
<br />
<br />

2. router.push() - 가장 많이 사용

```tsx
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function Home() {
  const goToAbout = () => {
    router.push('/about');  // about 페이지로 이동
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16 }}>
      <Button mode="contained" onPress={goToAbout}>
        About 페이지로 이동
      </Button>
    </View>
  );
}
```

<br />
<br />
<br />

3. 여러 화면으로 이동하는 예시

```tsx
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { router } from 'expo-router';

export default function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 16, gap: 12 }}>
      {/* 기본 이동 */}
      <Button 
        mode="contained" 
        onPress={() => router.push('/about')}
      >
        About 페이지
      </Button>

      {/* 동적 라우트 (파라미터 전달) */}
      <Button 
        mode="outlined" 
        onPress={() => router.push('/user/123')}
      >
        유저 상세 (ID: 123)
      </Button>

      {/* 쿼리 파라미터 전달 */}
      <Button 
        mode="outlined" 
        onPress={() => router.push('/product/456?tab=reviews')}
      >
        상품 상세 (리뷰탭)
      </Button>

      {/* 객체로 파라미터 전달 */}
      <Button 
        mode="outlined" 
        onPress={() => router.push({
          pathname: '/user/[id]',
          params: { id: '789', name: '홍길동' }
        })}
      >
        유저 상세 (객체 전달)
      </Button>

      {/* replace - 뒤로가기 불가 (로그인 후 사용) */}
      <Button 
        mode="text" 
        onPress={() => router.replace('/dashboard')}
      >
        대시보드 (replace)
      </Button>
    </View>
  );
}
```

<br />
<br />
<br />

4. 네비게이션 메서드 비교

```tsx
import { router } from 'expo-router';

// push - 스택에 추가 (뒤로가기 가능)
router.push('/about');

// replace - 현재 화면 교체 (뒤로가기 불가)
router.replace('/dashboard');

// back - 이전 화면으로
router.back();

// canGoBack - 뒤로가기 가능한지 체크
if (router.canGoBack()) {
  router.back();
} else {
  router.replace('/');
}

// dismiss - 모달 닫기
router.dismiss();

// dismissAll - 모든 모달 닫기
router.dismissAll();
```

<br />
<br />
<br />

5. 자동 리다이렉트

```tsx
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function Splash() {
  useEffect(() => {
    // 2초 후 자동으로 홈으로 이동
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
```

<br />
<br />
<br />

6. 조건부 리다이렉트 (인증 체크)

```tsx
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  const isLoggedIn = false;  // 실제로는 상태 관리로 체크

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/home');
    } else {
      router.replace('/login');
    }
  }, [isLoggedIn]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
```

<br />
<br />
<br />

7. 파라미터 받기

<br />

`이동할 때`

```tsx
// app/index.tsx
router.push({
  pathname: '/user/[id]',
  params: { id: '123', name: '홍길동', age: '25' }
});
```

<br />

`받는 쪽`

```tsx
// app/user/[id].tsx
import { useLocalSearchParams } from 'expo-router';

export default function UserDetail() {
  const { id, name, age } = useLocalSearchParams();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text>ID: {id}</Text>
      <Text>이름: {name}</Text>
      <Text>나이: {age}</Text>
    </View>
  );
}
```

<br />
<br />
<br />

8. 정리

```tsx
import { router } from 'expo-router';

// 가장 기본 (추천!)
<Button onPress={() => router.push('/about')}>이동</Button>

// Link 컴포넌트
<Link href="/about"><Text>이동</Text></Link>

// 파라미터 전달
router.push('/user/123');
router.push({ pathname: '/user/[id]', params: { id: '123' } });

// 특수 케이스
router.replace('/home');  // 뒤로가기 불가
router.back();           // 뒤로가기
```
