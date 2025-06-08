import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Banana from "./App"; // Complies with rule that components must start with a capital letter

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Banana />
  </StrictMode>
);
