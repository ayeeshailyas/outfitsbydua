import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import WishlistDrawer from "./components/WishlistDrawer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import WishlistPage from "./pages/WishlistPage";
import SearchResults from "./pages/SearchResults";
import NotFound from "./pages/NotFound";
import { About, Contact, Shipping, Returns } from "./pages/InfoPages";

function PageTransition({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/women" element={<PageTransition><CategoryPage mode="women" /></PageTransition>} />
        <Route path="/men" element={<PageTransition><CategoryPage mode="men" /></PageTransition>} />
        <Route path="/kids" element={<PageTransition><CategoryPage mode="kids" /></PageTransition>} />
        <Route path="/new-arrivals" element={<PageTransition><CategoryPage mode="new-arrivals" /></PageTransition>} />
        <Route path="/sale" element={<PageTransition><CategoryPage mode="sale" /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><WishlistPage /></PageTransition>} />
        <Route path="/search" element={<PageTransition><SearchResults /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/shipping" element={<PageTransition><Shipping /></PageTransition>} />
        <Route path="/returns" element={<PageTransition><Returns /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <div className="min-h-screen flex flex-col bg-background text-on-background">
          <ScrollToTop />
          <Header />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <Footer />
          <CartDrawer />
          <WishlistDrawer />
          <WhatsAppFloat />
        </div>
      </WishlistProvider>
    </CartProvider>
  );
}
