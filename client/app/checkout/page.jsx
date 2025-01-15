"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState, useContext, useEffect, Suspense } from "react";
import { CartContext } from "../_context/CartContext";
import GlobalApi from "@/app/_utils/GlobalApi";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export const dynamic = "force-dynamic";

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

      try {
        await GlobalApi.createOrder(orderData);

        const emailRes = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.primaryEmailAddress.emailAddress,
            orderId: details.id,
            totalAmount: totalAmount.toFixed(2),
          }),
        });

        if (!emailRes.ok) {
          console.error("Error al enviar el correo");
        } else {
          console.log("Correo enviado exitosamente");
        }

        cart.forEach(async (item) => {
          await GlobalApi.deleteCartItem(item.id);
        });

        setCart([]);
        sessionStorage.removeItem("totalAmount");
        alert("Payment Successful! Order placed.");
        router.push("/thank-you");
      } catch (error) {
        console.error("Error processing order:", error);
        alert(
          "Payment Successful, but there was an issue processing your order or sending the confirmation email."
        );
      }
    });
  };

  return (
    <div className="container bg-gray-50">
      <Suspense fallback={<p>Loading...</p>}>
        <form className="h-screen py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-semibold mb-4">Billing Details</h1>
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
                style={{ layout: "horizontal" }}
                createOrder={createOrder}
                onApprove={onApprove}
                onCancel={() => {
                  alert("Payment was canceled.");
                }}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  alert("An error occurred during the payment process.");
                }}
              />
            </PayPalScriptProvider>
          </div>
        </form>
      </Suspense>
    </div>
  );
}

export default Checkout;
