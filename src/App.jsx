import { BrowserRouter, Route, Routes } from "react-router-dom";

import Components from "./pages/Components.jsx";
import Home from "./pages/Home.jsx";
import Animation from "./pages/Animation.jsx";
import Calculator from "./pages/Calculator.jsx";
import ForwardToHome from "./pages/ForwardToHome.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import Todos from "./pages/Todos.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter basename="/multipages/">
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="components" element={<Components />} />
          <Route path="todos" element={<Todos />} />
          <Route path="animation" element={<Animation />} />
          <Route path="calculator" element={<Calculator />} />
          <Route path="*" element={<ForwardToHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
