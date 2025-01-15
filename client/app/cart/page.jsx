"use client";

import { CartContext } from "../_context/CartContext";
import { useContext, useEffect, useCallback } from "react";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "../_utils/GlobalApi";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

function Cart() {
  const router = useRouter();
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const getCartItem = useCallback(() => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    GlobalApi.getUserCartItems(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        const result = resp.data.data;
        setCart([]);
        result?.forEach((prd) => {
          setCart((prevCart) => [
            ...prevCart,
            {
              id: prd.id,
              product: prd.attributes.products.data[0],
            },
          ]);
        });
      })
      .catch((error) => console.error("Error fetching cart items:", error));
  }, [user?.primaryEmailAddress?.emailAddress, setCart]);

  useEffect(() => {
    if (user) getCartItem();
  }, [user, getCartItem]);

  const getTotalAmount = () => {
    return cart
      .reduce((total, item) => total + Number(item.product.attributes.price), 0)
      .toFixed(2);
  };

  const deleteCartItem_ = (id) => {
    GlobalApi.deleteCartItem(id)
      .then(() => getCartItem())
      .catch((error) => console.error("Error deleting cart item:", error));
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                Your Cart
              </h1>
            </header>
            <div className="mt-8">
              <ul className="space-y-4">
                {cart.map((item, index) => (
                  <li key={index} className="flex items-center gap-4">
                    <Image
                      src={
                        item.product?.attributes?.image?.data?.[0]?.attributes
                          ?.url || "/default.jpg"
                      }
                      alt={item.product?.attributes?.title || "Product"}
                      className="size-16 rounded object-cover"
                      width={100}
                      height={100}
                    />
                    <div>
                      <h3 className="text-sm text-gray-900">
                        {item.product?.attributes?.title}
                      </h3>
                      <dl className="mt-0.5 text-[10px] text-gray-600">
                        <div>
                          <dt className="inline">
                            {item.product?.attributes?.category}:
                          </dt>
                        </div>
                        <div>
                          <dt className="inline">
                            ${item.product?.attributes?.price}
                          </dt>
                        </div>
                      </dl>
                    </div>
                    <div className="flex flex-1 justify-end gap-2">
                      <button
                        className="text-gray-600 hover:text-red-600"
                        onClick={() => deleteCartItem_(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex justify-end border-t pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="text-sm text-gray-700">
                    <div className="flex justify-end text-base font-medium">
                      <dt className="px-10">Total</dt>
                      <dd>${getTotalAmount()}</dd>
                    </div>
                  </dl>
                  <div className="flex justify-end">
                    <button
                      onClick={() => {
                        const total = getTotalAmount();
                        if (total > 0) {
                          sessionStorage.setItem("totalAmount", total);
                          router.push("/checkout");
                        } else {
                          alert("Cart is empty");
                        }
                      }}
                      className="block bg-gray-700 px-5 py-3 text-sm text-white hover:bg-gray-600"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Suspense>
  );
}

export default Cart;
