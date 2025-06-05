import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const cartTotalQuantity = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );
  return (
    <header className="header ">
      <Link to="/">
        <h1 className="text-xl font-bold">Manloi e-Shop</h1>
      </Link>
      <button style={{ cursor: "pointer" }} className="text-xl flex flex-row">
        <Link to="/cart">
          <FaShoppingCart />
        </Link>
        {cartTotalQuantity > 0 && (
          <span className="absolute top-5 right-3 bg-red-500 text-white rounded-full text-xs px-2">
            {cartTotalQuantity}
          </span>
        )}
      </button>
    </header>
  );
};

export default Header;
