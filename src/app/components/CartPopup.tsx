"use client";
import { useCart } from "./CartContext";
import { clearCartAsync, removeFromCartAsync } from "@/helpers/gql.request";

export default function CartPopup() {
  const [cart, setCart] = useCart();

  const handleRemove = async (id: string) => {
    const res = await removeFromCartAsync(id);
    if (res) {
      setCart((prev) => {
        const updatedProducts = prev.products.filter(
          (prod) => prod.identifier !== id
        );
        return { ...prev, products: updatedProducts };
      });
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col items-center justify-center w-1/2 p-4 bg-white rounded-lg">
        <h2 className="mb-4 text-2xl font-bold leading-10 text-gray-800">
          Your Cart
        </h2>
        {cart.products.length === 0 && (
          <p className="mb-4 text-lg leading-7 text-gray-600">
            You have 0 items in your cart.
          </p>
        )}
        {cart.products.length > 0 && (
          <>
            <div className="flex flex-col gap-2 w-full">
              {cart.products.map((product, index) => (
                <div
                  key={index}
                  className="flex text-black w-full justify-between items-center"
                >
                  <div className="font-bold">{product.name}</div>
                  <button
                    className="px-2 py-2 text-white bg-[rgb(0,48,73)] rounded-lg"
                    onClick={async () => handleRemove(product.identifier)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-between w-full">
              <button
                className="mt-6 px-4 py-2 text-lg font-bold text-white bg-green-800 rounded-lg"
                onClick={async () => {
                  const res = await clearCartAsync();
                  res && setCart({ products: [] });
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
