import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { GmailClone } from "./GmailClone";
import { MultiInput } from "./input/multiinput";
import { savedEmail } from "./input/entity";
// import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <GmailClone /> */}
    <MultiInput
      listApi={({search}) => {
        return new Promise<any[]>((resolve) => {
          resolve(savedEmail.filter(el=>el.email.toLowerCase().includes(search) || el.uName.toLowerCase().includes(search)));
        });
      }}
    />
  </StrictMode>
);
