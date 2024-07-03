import { NextUIProvider } from "@nextui-org/react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Home from "./pages/home";
import { GlobalStyles } from "./styles/global";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <Home />
    <GlobalStyles />
    <ToastContainer theme="dark" />
  </NextUIProvider>
);
