import { useEffect, useState } from "react";

const DyslexieToggle = () => {
  const [isDyslexieEnabled, setIsDyslexieEnabled] = useState(false);

  useEffect(() => {
    // Check localStorage for previous preference
    const savedPreference = localStorage.getItem("dyslexieFont");
    if (savedPreference === "enabled") {
      document.body.classList.add("dyslexie");
      setIsDyslexieEnabled(true);
    }
  }, []);

  const handleToggle = () => {
    if (isDyslexieEnabled) {
      document.body.classList.remove("dyslexie");
      localStorage.setItem("dyslexieFont", "disabled");
    } else {
      document.body.classList.add("dyslexie");
      localStorage.setItem("dyslexieFont", "enabled");
    }
    setIsDyslexieEnabled(!isDyslexieEnabled);
  };

  return (
    <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input type="checkbox" checked={isDyslexieEnabled} onChange={handleToggle} />
      Enable Dyslexie Font
    </label>
  );
};

export default DyslexieToggle;
