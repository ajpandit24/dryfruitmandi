
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
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import { fetchMenuData } from "./redux/menuSlice";
import {fetchCategoriesAndSubcategories} from "./redux/menuSlice";
import CategoriesPage from "./pages/CategoriesPage";

function App() {

  const dispatch = useDispatch();
  useEffect(() => {
        // Sync master navigation data immediately when the site loads
        dispatch(fetchCategoriesAndSubcategories());
    }, [dispatch]);


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
          <Route path='/categories' element={<CategoriesPage />} />

          <Route path='/cart' element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>

      <Toast />


    </>
  )
}

export default App
