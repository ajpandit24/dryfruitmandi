
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Contact from './pages/Contact'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/CartPage";
import Toast from "./components/Toast";

function App() {

  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/products' element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path='/contact' element={<Contact />} />

          <Route path='/cart' element={<CartPage />} />
        </Routes>
    </BrowserRouter>

    <Toast />

    <Footer />
    </>
  )
}

export default App
