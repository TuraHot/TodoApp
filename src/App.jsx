import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect, use } from "react";

import Components from "./pages/Components/Components.jsx";
import Home from "./pages/Home/Home.jsx";
import Animation from "./pages/Animation/Animation.jsx";
import Calculator from "./pages/Calculator/Calculator.jsx";
import ForwardToHome from "./pages/ForwardToHome.jsx";
import AppLayout from "./layouts/AppLayout.jsx";
import Todos from "./pages/Todos/Todos.jsx";
import Products from "./pages/Products/Products.jsx";
import Carts from "./pages/Carts/Carts.jsx";
import Login from "./pages/Login/Login.jsx";

import { fetchProducts } from "./data/products.jsx";

import "./App.css";

function App() {
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => setProducts(fetchProducts()), []);

  useEffect(() => console.log('Fetch product successful!!'), [products]);

  if (token === "") {
    return <Login setToken={setToken} setRole={setRole}/>;
  } else {
    return (
      <BrowserRouter basename="/multipages/">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} role={role} setToken={setToken}/>}>
            <Route path="home" element={<Home />} />
            <Route path="calculator" element={<Calculator />} />
            <Route path="animation" element={<Animation />} />
            <Route path="components" element={<Components />} />
            <Route path="todos" element={<Todos />} />
            <Route
              path="products"
              element={
                <Products
                  products={products}
                  carts={carts}
                  setCarts={setCarts}
                />
              }
            />
            <Route
              path="carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
