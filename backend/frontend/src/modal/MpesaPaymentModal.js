import React, { useState, useContext, useReducer } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import mpesaLogo from "../assets/images/mpesa_logo.png";

const reducer = (state, action) => {
  switch (action.type) {
    case "PAYMENT_REQUEST":
      return { ...state, loadingAdd: true };
    case "PAYMENT_SUCCESS":
      return { ...state, loadingAdd: false };
    case "PAYMENT_FAIL":
      return { ...state, loadingAdd: false };
    default:
      return state;
  }
};

export default function MpesaPaymentModal({
  handleShow,
  handleCloseModal,
  amount,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");

  const { state } = useContext(Store);
  const { userInfo } = state;
  const [{ loading, error, loadingPayment }, dispatch] = useReducer(reducer, {
    loading: false,
    error: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(phoneNumber, amount)
    try {
      dispatch({ type: "PAYMENT_REQUEST" });
      await axios.get(`/api/mpesa/simulate/${phoneNumber}/${amount}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: "PAYMENT_SUCCESS",
      });
      toast.success("Payment made successfully");
      handleCloseModal()
    } catch (err) {
      toast.error(getError(err));
      dispatch({ type: "PAYMENT_FAIL" });
    }
  };

  return (
    <>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Modal centered show={handleShow} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <img src={mpesaLogo} alt="Mpesa Payment" height="100" />
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Payment number</Form.Label>
                <Form.Control
                  type="number"
                  value={phoneNumber}
                  placeholder="254722000000"
                  autoFocus
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button disabled={loadingPayment} variant="dark" onClick={submitHandler} style={{width: "100%"}}>
              Pay
            </Button>
            {loadingPayment && <LoadingBox></LoadingBox>}
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
