import Image from "next/image";
import styles from "./domain.module.css";

const domain = () => {
  return (
    <div>
      <Image
        className={styles.logo}
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <p>Domain</p>
    </div>
  );
};

export default domain;
