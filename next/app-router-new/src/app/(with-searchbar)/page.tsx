import styles from "./../page.module.css";

export default function Home() {
  console.log("서버컴포넌트");
  return <div className={styles.page}>인덱스 페이지</div>;
}
