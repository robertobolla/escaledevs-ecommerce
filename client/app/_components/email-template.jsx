export const EmailTemplate = ({ firstName, orderId, totalAmount }) => (
  <div>
    <h1>Thank you for your order, {firstName}!</h1>
    <p>
      Your order ID is: <strong>{orderId}</strong>
    </p>
    <p>
      Total Amount: <strong>${totalAmount}</strong>
    </p>
    <p>We appreciate your business and hope you enjoy your purchase.</p>
  </div>
);
