import React from "react";
import styles from "./Main.module.css";
import ChatBotCardImg from "../../assets/Chat-bot-bro.svg";
import ResponsiveImg from "../../assets/responsive.svg";
import ConversationalImg from "../../assets/conversational.jpg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Features</h3>
      </div>
      <div className={styles.cards}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={ConversationalImg} alt="ConversationalImg" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.cardTitle}>Azure AI Powered</h1>
            <p>
            Support Edge is an Azure AI-powered job coaching assistant built on Azure OpenAI’s GPT-4 model. 
            It leverages advanced natural language processing (NLP) and contextual understanding to deliver intelligent, human-like conversations. 
            With a vast knowledge base and AI-driven job matching, Support Edge provides personalized career guidance, job recommendations, 
            and coaching support to help job seekers achieve their career goals. Its enhanced language generation capabilities enable it to offer detailed, 
            nuanced responses, making it a powerful tool for both job seekers and coaches.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={ChatBotCardImg} alt="ChatBotCardImg" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.cardTitle}>Job Matching AI</h1>
            <p>
             SupportEdge is an AI-powered job matching chatbot designed to facilitate interactive and dynamic career coaching conversations. 
             It leverages advanced natural language understanding and generation to provide accurate, context-aware responses to user queries. 
             SupportEdge offers personalized job recommendations, career advice, and coaching support with a high level of response consistency 
             and reduced randomness, ensuring reliable and meaningful interactions for job seekers and coaches alike.
            </p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.image}>
            <img src={ResponsiveImg} alt="ResponsiveImg" />
          </div>
          <div className={styles.text}>
            <h1 className={styles.cardTitle}>Responsive & Clean UI</h1>
            <p>
              SupportEdge features a clean, responsive, and accessible user interface (UI) designed for a seamless and intuitive user experience. 
              The UI ensures effortless interaction with the chatbot, adapting smoothly to different screen sizes and devices for a consistent experience 
              across platforms. Additionally, accessibility settings are integrated, including text-to-speech support, keyboard navigation, screen reader 
              compatibility, and customizable contrast options, making it inclusive for users with disabilities.
            </p>
          </div>
        </div>
      </div>
      <div className={styles.explore}>
        <Link to="/chatbox">
          <button className={styles.btn}>Explore Now !</button>
        </Link>
      </div>
    </div>
  );
};

export default Main;
