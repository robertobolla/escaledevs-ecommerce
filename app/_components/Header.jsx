import { UserButton, useUser } from "@clerk/nextjs";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "../_utils/GlobalApi";
import Cart from "../_components/Cart";

function Header() {
  const { user } = useUser();
  const [isLogin, setIsLogin] = useState();
  const { cart, setCart } = useContext(CartContext);
  const [openCart, setOpenCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para el menú móvil
  const menuRef = useRef(null); // Referencia para el menú
  const toggleRef = useRef(null); // Referencia para el botón toggle

  useEffect(() => {
    setIsLogin(window.location.href.toString().includes("sign-in"));
  }, []);

  useEffect(() => {
    user && getCartItem();
  }, [user]);

  // Cerrar menú al hacer clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target)
      ) {
        setMenuOpen(false); // Cierra el menú si el clic es fuera
        console.log("Menu closed: Clicked outside");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getCartItem = () => {
    GlobalApi.getUserCartItems(user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        const result = resp.data.data;

        result &&
          result.forEach((prd) => {
            setCart((cart) => [
              ...cart,
              {
                id: prd.id,
                product: prd.attributes.products.data[0],
              },
            ]);
          });
      }
    );
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
    console.log("Toggle menu clicked, menuOpen:", !menuOpen);
  };

  return (
    !isLogin && (
      <header className="bg-black">
        <div className="mx-auto flex shadow-sm h-16 items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
          <a href="/">
            <Image src="/logo2.png" alt="logo" width={160} height={50} />
          </a>

          <div className="flex flex-1 items-center justify-end md:justify-between relative">
            {/* Menú de navegación móvil */}
            <nav
              aria-label="Global"
              ref={menuRef} // Agrega la referencia al menú
              className={`${
                menuOpen ? "block" : "hidden"
              } absolute top-12 left-0 w-full bg-black md:block md:static md:w-auto z-50 shadow-lg`}
            >
              <ul className="flex flex-col  md:space-x-8 items-center gap-0 text-sm md:flex-row md:pl-20">
                <li className=" w-full text-center">
                  <a
                    className="text-white transition whitespace-nowrap py-3 block hover:text-gray-400/75"
                    href="/projects"
                  >
                    Projects
                  </a>
                </li>
                <li className=" w-full text-center">
                  <a
                    className="text-white transition whitespace-nowrap py-3 block hover:text-gray-400/75"
                    href="about"
                  >
                    About Us
                  </a>
                </li>
                <li className="w-full text-center">
                  <a
                    className="text-white transition whitespace-nowrap py-3 block hover:text-gray-400/75"
                    href="contact"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex items-center gap-4">
              {!user ? (
                <div className="sm:flex sm:gap-4">
                  <a
                    className="block rounded-md bg-primary-light px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-dark"
                    href="sign-in"
                  >
                    Login
                  </a>

                  <a
                    className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-primary-light transition hover:text-primary-dark sm:block"
                    href="sign-up"
                  >
                    Register
                  </a>
                </div>
              ) : (
                <div
                  className="flex items-center gap-5"
                  onClick={() => setOpenCart(!openCart)}
                >
                  <UserButton />
                  <h2 className="flex gap-1 text-white">
                    <ShoppingCart />({cart?.length})
                  </h2>
                </div>
              )}
              {openCart && <Cart />}

              {/* Botón para abrir/cerrar el menú móvil */}
              <button
                onClick={toggleMenu}
                ref={toggleRef} // Agrega referencia al botón
                className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
              >
                <span className="sr-only">Toggle menu</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
    )
  );
}

export default Header;
