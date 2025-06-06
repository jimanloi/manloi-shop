import "./App.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Products from "./components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar />
                <Products />
              </>
            }
          ></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/cart/payment" element={<Payment />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
