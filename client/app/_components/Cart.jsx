import { CartContext } from "../_context/CartContext";
import { useContext } from "react";
import Image from "next/image";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  return (
    <div className="h-[300px] w-[250px] bg-gray-100 z-10 rounded-md absolute mx-10 right-10 top-12 p-5 overflow-auto">
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {cart.map((item, index) => (
            <li key={index} className="flex items-center gap-4">
              <Image
                src={
                  item.product?.attributes?.image?.data?.[0]?.attributes?.url
                }
                alt=""
                className="size-16 rounded object-cover"
                width={100}
                height={100}
              />

              <div>
                <h3 className="text-sm text-gray-900 line-clamp-1">
                  {item.product?.attributes?.title}
                </h3>

                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                  <div>
                    <dt className="inline">
                      {item.product?.attributes?.category}
                    </dt>
                  </div>

                  <div>
                    <dt className="inline">
                      ${item.product?.attributes?.price}
                    </dt>
                  </div>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4 text-center mt-5">
        <a
          href="/cart"
          className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
        >
          View my cart ({cart?.length})
        </a>

        <a
          href="#"
          className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600"
        >
          Continue shopping
        </a>
      </div>
    </div>
  );
}

export default Cart;
