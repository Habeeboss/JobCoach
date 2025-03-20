import React from "react";
import styles from "./Header.module.css";
import chatbotBanner from "../../assets/chatbotbanner.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p className={styles.heading}>
          Welcome to Key Insight  Empowering Job Coaches, Transforming Lives
        </p>
        <p className={styles.subHeading}>
        Job coaches face overwhelming administrative tasks, limiting the time they can dedicate to personalized coaching for job seekers with unique needs.
        Key Insight harnesses AI to reduce administrative burdens, automate job matching, and provide intelligent training assistance and motivational support—so job coaches can focus on what truly matters: helping job seekers succeed.
        </p>
        <Link to="/chatbox">
          <button className={styles.btn}>Get Started</button>
        </Link>
      </div>
      <div className={styles.right}>
        <img src={chatbotBanner} alt="AI" />
      </div>
    </div>
  );
};

export default Header;
