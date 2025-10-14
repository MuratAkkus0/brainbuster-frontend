import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.tsx";
import { persistor, store } from "@/store/store.ts";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
        <Toaster position="top-right" richColors />
      </PersistGate>
    </Provider>
  </>
);
