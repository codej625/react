import { Html, Head, Main, NextScript } from "next/document";

// Document는 메타 태그, 폰트, 캐릭터셋, 구글 애널리틱스 같은 페이지 전체에 적용되는 HTML 태그 관리를 위해 사용
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* 구글 폰트 추가
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
          rel="stylesheet"
        />
        메타 태그 추가
        <meta name="description" content="내 웹사이트 설명" />
        파비콘 추가
        <link rel="icon" href="/favicon.ico" /> 
        */}
      </Head>
      <body>
        {/* Google Analytics 스크립트
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        /> 
        */}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
