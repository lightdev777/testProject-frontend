"use client";
import { Product, ProductInCart } from "@/api/types";
import { useCart } from "./CartContext";
import { addToCart, removeFromCart } from "@/helpers/gql.request";

export default function HandleCart({
  id,
  product,
}: {
  id: string;
  product: Product;
}) {
  const [cart, setCart] = useCart();

  const { addItemToCart, loading: loadingAdd } = addToCart(
    product.identifier,
    product.collection,
    product.name,
    product.description,
    product.image_url
  );
  const { removeItemFromCart, loading: loadingRemove } = removeFromCart(
    product.identifier
  );

  const handleCartAction = async () => {
    const idx = cart.products.findIndex((p) => p.identifier === id);
    if (idx < 0) {
      addItemToCart().then(() =>
        setCart((prev) => {
          const updatedProducts = [
            ...prev.products,
            { ...product, collectionName: product.collection } as ProductInCart,
          ];
          return { ...prev, products: updatedProducts };
        })
      );
    } else {
      removeItemFromCart().then(() =>
        setCart((prev) => {
          const updatedProducts = prev.products.filter(
            (_, index) => index !== idx
          );
          return { ...prev, products: updatedProducts };
        })
      );
    }
  };

  return (
    <button
      className="mt-6 px-8 py-2 text-lg font-bold text-white bg-[rgb(0,48,73)] rounded-lg"
      disabled={loadingAdd || loadingRemove}
      onClick={handleCartAction}
    >
      {cart.products.findIndex((p) => p.identifier === id) < 0
        ? "Add To Cart"
        : "Remove From Cart"}
    </button>
  );
}
