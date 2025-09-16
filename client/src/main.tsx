// Debug fetch calls (add this before any imports)
const originalFetch = window.fetch;
window.fetch = async (...args) => {
  console.log("FETCH CALL:", args);
  try {
    const response = await originalFetch(...args);
    console.log("FETCH RESPONSE:", response);
    return response;
  } catch (err) {
    console.error("FETCH ERROR:", err);
    throw err;
  }
};

import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
