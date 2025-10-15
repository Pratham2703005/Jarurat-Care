import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Home from "./pages/home";
import Patients from "./pages/patient";
import About from "./pages/about";
import {createRoot} from 'react-dom/client'
import { Provider } from "react-redux";
import { store } from "./redux/store";
import './index.css'


createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="patients" element={<Patients />} />
        <Route path="about" element={<About />} />
      </Route>
    </Routes>
  </BrowserRouter>
</Provider>
);
