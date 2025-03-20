import React from "react";
import styles from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import DyslexieToggle from "../Dyslexie/Dyslexie";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          Copyright © 2025 SupportEdge. Designed By{" "}
          <a href="https://www.linkedin.com/in/bharathkumarsampath/">Bharath Kumar Sampath</a>
        </p>
      </div>
      <div className={styles.handles}>
        <a href="#">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://github.com/bharathkumarsampath">
          <FontAwesomeIcon icon={faGithub} />
        </a>
        <a href="https://www.linkedin.com/in/bharathkumarsampath/">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
      <DyslexieToggle/>
    </div>
  );
};

export default Footer;
