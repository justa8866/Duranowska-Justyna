import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import emailjs from "@emailjs/browser";
import {
  Container,
  MainText,
  Form,
  Label,
  Input,
  InputGroup,
  ErrorInput,
  ErrorMessage,
  Button,
} from "./DeliveryForm.style";
import { db } from "../../common/firebase";
import { useNavigate, Link } from "react-router-dom";

const DeliveryForm = () => {
  const [state, setState] = useState({
    isInvoiceRequired: false,
    firstName: "",
    lastName: "",
    street: "",
    houseNumber: "",
    apartmentNumber: "",
    city: "",
    postalCode: "",
    phone: "",
    company: "",
    taxId: "",
    errors: {
      firstName: false,
      lastName: false,
      street: false,
      houseNumber: false,
      city: false,
      postalCode: false,
      phone: false,
      company: false,
      taxId: false,
    },
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setState((prevState) => ({ ...prevState, [name]: inputValue }));
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!state.firstName) {
      formIsValid = false;
      errors["firstName"] = "This field is required.";
    }

    if (!state.lastName) {
      formIsValid = false;
      errors["lastName"] = "This field is required.";
    }

    if (!state.street) {
      formIsValid = false;
      errors["street"] = "This field is required.";
    }

    if (!state.houseNumber) {
      formIsValid = false;
      errors["houseNumber"] = "This field is required.";
    }

    if (!state.city) {
      formIsValid = false;
      errors["city"] = "This field is required.";
    }

    if (!state.postalCode) {
      formIsValid = false;
      errors["postalCode"] = "This field is required.";
    }

    if (!state.phone) {
      formIsValid = false;
      errors["phone"] = "This field is required.";
    } else if (typeof state.phone !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(state.phone)) {
        formIsValid = false;
        errors["phone"] = "Enter only number.";
      } else if (state.phone.length !== 9) {
        formIsValid = false;
        errors["phone"] = "Enter valid phone number.";
      }
    }

    if (state.isInvoiceRequired) {
      if (!state.company) {
        formIsValid = false;
        errors["company"] = "This field is required.";
      }

      if (!state.taxId) {
        formIsValid = false;
        errors["taxId"] = "This field is required.";
      }
    }

    setState({
      ...state,
      errors: errors,
    });

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          customer: {
            firstName: state.firstName,
            lastName: state.lastName,
            phone: state.phone,
            isInvoiceRequired: state.isInvoiceRequired,
            company: state.company,
            taxId: state.taxId,
            email: getEmail(),
          },
          shipping: {
            city: state.city,
            postalCode: state.postalCode,
            street: state.street,
            houseNumber: state.houseNumber,
            apartmentNumber: state.apartmentNumber,
          },
          products: getCart(),
        });
        
        emailjs
        .send(
          "service_j2jtep2",
          "template_xo9f0fl",
          {
            from_name: `${state.firstName} ${state.lastName}`,
            email: getEmail(),
            reply_to: getEmail(),
            message: `Your order has been placed. Your order ID is ${docRef.id}. You will receive an email with the details of your order. Your order will be within 7 days to the address provided. Thank you for shopping with us!`,
          },
          {
            publicKey: "e-oE3m3EwqU6uZ7lU",
          }
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response.status, response.text);
          },
          (err) => {
            console.log("FAILED...", err);
          }
        );
        navigate("/payment");
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  const getCart = () => {
    const cart = [];
    const cartStorage = localStorage.getItem("cart");

    if (cartStorage) {
      JSON.parse(cartStorage).map((item) => cart.push({ ...item }));
    }

    return cart;
  };

  const getEmail = () => {
    const user = localStorage.getItem("user");

    if (user) {
      return JSON.parse(user).email;
    }

    return "";
  };

  const renderInput = (name, type = "text") => {
    return (
      <InputGroup>
        {state.errors[name] ? (
          <ErrorInput
            type={type}
            name={name}
            value={state[name]}
            onChange={handleInputChange}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={state[name]}
            onChange={handleInputChange}
          />
        )}
        {state.errors[name] && (
          <ErrorMessage>{state.errors[name]}</ErrorMessage>
        )}
      </InputGroup>
    );
  };

  return (
    <Container>
      <MainText>DELIVERY FORM</MainText>
      <Form onSubmit={handleSubmit}>
        <Label>
          First Name:
          {renderInput("firstName")}
        </Label>
        <Label>
          Last Name:
          {renderInput("lastName")}
        </Label>
        <Label>
          Phone:
          {renderInput("phone")}
        </Label>
        <Label>
          City:
          {renderInput("city")}
        </Label>
        <Label>
          Postal Code:
          {renderInput("postalCode")}
        </Label>
        <Label>
          Street:
          {renderInput("street")}
        </Label>
        <Label>
          House Number:
          {renderInput("houseNumber")}
        </Label>
        <Label>
          Apartment Number:
          {renderInput("apartmentNumber")}
        </Label>
        <Label>
          I want an invoice:
          {renderInput("isInvoiceRequired", "checkbox")}
        </Label>
        {state.isInvoiceRequired && (
          <>
            <Label>
              Company Name:
              {renderInput("company")}
            </Label>
            <Label>
              Tax ID:
              {renderInput("taxId")}
            </Label>
          </>
        )}
        <Link to="/payment">
          <Button type="submit">Submit Order</Button>
        </Link>
      </Form>
    </Container>
  );
};

export default DeliveryForm;
