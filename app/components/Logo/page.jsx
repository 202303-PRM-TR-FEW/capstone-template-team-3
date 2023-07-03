import React from "react";
import styles from "styles/logo.module.css";
import Link from "next/link";

const Logo = ({ to }) => {
  return (
    <div className={styles.logo}>
      <Link href={to}>
        <p>Givingly</p>
      </Link>
    </div>
  );
};

export default Logo;
