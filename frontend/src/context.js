import React, { createContext, useContext, useRef, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const lastMsg = useRef();
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi there! I'm your Job Coaching assistant, I'm here to help you out with your Job Matching. Share me details of your profile and the kind job you are looking for.",
    },
  ]);
  const [processing, setProcessing] = useState(false);

  const handleSubmission = async () => {
    if (!messageText?.trim() || processing) return;

    const tempMessages = [
      ...messages,
      {
        from: "human",
        text: messageText,
      },
    ];

    setMessages(tempMessages);
    setMessageText("");

    setTimeout(() => {
      if (lastMsg.current) {
        lastMsg.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);

    try {
      setProcessing(true);
      console.log("Sending API request to:", "http://localhost:5500");
      const res = await fetch(`http://127.0.0.1:5500`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          messages: tempMessages.slice(-8),
        }),
      });
      setProcessing(false);

      if (!res.ok) throw new Error("Failed to fetch response from server.");

      const data = await res.json();
      // console.log(data);
      const ans = data.data;

      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: ans.trim(),
        },
      ]);
    } catch (err) {
      const error = "Error Proceesing this message. Please try in sometime";
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text: error,
        },
      ]);
    }

    setTimeout(() => {
      if (lastMsg.current) {
        lastMsg.current.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  };

  return (
    <AppContext.Provider
      value={{
        lastMsg,
        messageText,
        setMessageText,
        processing,
        setProcessing,
        messages,
        setMessages,
        handleSubmission,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;

export const useGlobalContext = () => {
  return useContext(AppContext);
};
