import React from "react";
import Button from "react-bootstrap/Button";

export default function MpesaPaymentButton({ showModal }) {
  return (
    <Button variant="success" onClick={showModal}>
      Mpesa Payment
    </Button>
  );
}
