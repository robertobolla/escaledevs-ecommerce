"use client";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Input } from "../_assets/_ui/input";
import { useState, useContext, useEffect } from "react";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Checkout() {
  const router = useRouter();
  const { user } = useUser();
  const { cart, setCart } = useContext(CartContext);

  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const total = sessionStorage.getItem("totalAmount");
    if (total) {
      setTotalAmount(parseFloat(total));
    }
  }, []);

  const createOrder = (data, actions) => {
    console.log("Datos enviados a Strapi desde Axios:", data);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = async (data, actions) => {
    console.log("Objeto user:", user);

    return actions.order.capture().then(async (details) => {
      const productIds = cart.map((item) => item?.product?.id);
      const orderData = {
        data: {
          email: user.primaryEmailAddress.emailAddress,
          userName: user.fullName,
          amount: totalAmount,
          products: productIds,
          transactionId: details.id,
        },
      };
      console.log("Datos enviados a Strapi:", orderData);

      try {
        // Crear la orden en Strapi
        await GlobalApi.createOrder(orderData);

        // Llamar a la API de correo
        const emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress, // El correo del usuario
            orderId: details.id,
            totalAmount: totalAmount.toFixed(2),
          }),
        });

        if (!emailRes.ok) {
          console.error("Error al enviar el correo");
        } else {
          console.log("Correo enviado exitosamente");
        }

        // Limpiar el carrito
        cart.forEach(async (item) => {
          await GlobalApi.deleteCartItem(item.id);
        });
        setCart([]);
        sessionStorage.removeItem("totalAmount");
        alert("Payment Successful! Order placed.");
        router.push("/thank-you");
      } catch (error) {
        console.error("Error al procesar la orden o enviar el correo:", error);
        alert(
          "Payment Successful, but there was an issue processing your order or sending confirmation email."
        );
      }
    });
  };

  return (
    <div className="container bg-gray-50">
      <form className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-semibold mb-4">Biling Details</h1>
          <div className="md:w3/4"></div>
          <div className="md:w-1/4">
            <h2 className="text-lg font-semibold mb-4 py-5">
              Total ({cart.length}) : ${totalAmount.toFixed(2)}
            </h2>
          </div>
          <PayPalScriptProvider
            options={{
              clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            }}
          >
            <PayPalButtons
              className=""
              style={{ layout: "horizontal" }}
              createOrder={createOrder}
              onApprove={onApprove}
              onCancel={() => {
                console.warn("Pago cancelado por el usuario.");
                alert("Payment was canceled.");
              }}
              onError={(err) => {
                console.error("Error en PayPal:", err);
                alert(
                  "An error occurred during the payment process. Please try again."
                );
              }}
            />
          </PayPalScriptProvider>
        </div>
      </form>
    </div>
  );
}
//onCancel={() => {}}
export default Checkout;
