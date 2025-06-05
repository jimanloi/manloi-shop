import { useDispatch } from "react-redux";
import { useGetProductsQuery } from "../api/slice";
import type { Product } from "../types/productTypes";
import { addToCart } from "../store/cartSlice";

const Products: React.FC = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  console.log(data?.products);

  return (
    <div className="flex flex-wrap justify-center gap-5 mb-15">
      {data?.products.map((product: Product) => (
        <div
          key={product.id}
          className="border p-4 rounded w-60 h-80 bg-gray-200 flex flex-col justify-between items-center"
        >
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-40 object-cover rounded"
          />
          <h3 className="text-lg font-bold">{product.title}</h3>
          <p className="text-gray-600">${product.price}</p>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-400"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
