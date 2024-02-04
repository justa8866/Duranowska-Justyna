import React, { Component } from "react";
import { collection, addDoc } from "firebase/firestore";
import { Container, MainText, Form, Label, Input, InputGroup, ErrorInput, ErrorMessage, Button } from "./DeliveryForm.style";
import { db } from "../../common/firebase";

export default class DeliveryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    this.setState({ [name]: inputValue });
  };

  validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!this.state.firstName) {
      formIsValid = false;
      errors["firstName"] = "This field is required.";
    }

    if (!this.state.lastName) {
      formIsValid = false;
      errors["lastName"] = "This field is required.";
    }

    if (!this.state.street) {
      formIsValid = false;
      errors["street"] = "This field is required.";
    }

    if (!this.state.houseNumber) {
      formIsValid = false;
      errors["houseNumber"] = "This field is required.";
    }

    if (!this.state.city) {
      formIsValid = false;
      errors["city"] = "This field is required.";
    }

    if (!this.state.postalCode) {
      formIsValid = false;
      errors["postalCode"] = "This field is required.";
    }

    if (!this.state.phone) {
      formIsValid = false;
      errors["phone"] = "This field is required.";
    } else if (typeof this.state.phone !== "undefined") {
      var pattern = new RegExp(/^[0-9\b]+$/);
      if (!pattern.test(this.state.phone)) {
        formIsValid = false;
        errors["phone"] = "Enter only number.";
      } else if (this.state.phone.length !== 9) {
        formIsValid = false;
        errors["phone"] = "Enter valid phone number.";
      }
    }

    if (this.state.isInvoiceRequired) {
      if (!this.state.company) {
        formIsValid = false;
        errors["company"] = "This field is required.";
      }

      if (!this.state.taxId) {
        formIsValid = false;
        errors["taxId"] = "This field is required.";
      }
    }

    this.setState({
      errors: errors,
    });

    return formIsValid;
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          customer: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            phone: this.state.phone,
            isInvoiceRequired: this.state.isInvoiceRequired,
            company: this.state.company,
            taxId: this.state.taxId,
          },
          shipping: {
            city: this.state.city,
            postalCode: this.state.postalCode,
            street: this.state.street,
            houseNumber: this.state.houseNumber,
            apartmentNumber: this.state.apartmentNumber,
          },
          products: this.getCart(),
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };

  getCart = () => {
    const cart = [];
    const cartStorage = localStorage.getItem("cart");

    if (cartStorage) {
      JSON.parse(cartStorage).map((item) =>
        cart.push({ ...item })
      );
    }

    return cart;
  };

  renderInput = (name, type = "text") => {
    return (
      <InputGroup>
        {this.state.errors[name] ? (
          <ErrorInput
            type={type}
            name={name}
            value={this.state[name]}
            onChange={this.handleInputChange}
          />
        ) : (
          <Input
            type={type}
            name={name}
            value={this.state[name]}
            onChange={this.handleInputChange}
          />
        )}
        {this.state.errors[name] && <ErrorMessage>{this.state.errors[name]}</ErrorMessage>}
      </InputGroup>
    );
  };

  render() {
    return (
      <Container>
        <MainText>DELIVERY FORM</MainText>
        <Form onSubmit={this.handleSubmit}>
          <Label>
            First Name:
            {this.renderInput("firstName")}
          </Label>
          <Label>
            Last Name:
            {this.renderInput("lastName")}
          </Label>
          <Label>
            Phone:
            {this.renderInput("phone")}
          </Label>
          <Label>
            City:
            {this.renderInput("city")}
          </Label>
          <Label>
            Postal Code:
            {this.renderInput("postalCode")}
          </Label>
          <Label>
            Street:
            {this.renderInput("street")}
          </Label>
          <Label>
            House Number:
            {this.renderInput("houseNumber")}
          </Label>
          <Label>
            Apartment Number:
            {this.renderInput("apartmentNumber")}
          </Label>
          <Label>
            I want an invoice:
            {this.renderInput("isInvoiceRequired", "checkbox")}
          </Label>
          {this.state.isInvoiceRequired && (
            <>
              <Label>
                Company Name:
                {this.renderInput("company")}
              </Label>
              <Label>
                Tax ID:
                {this.renderInput("taxId")}
              </Label>
            </>
          )}
          <Button type="submit">Submit Order</Button>
        </Form>
      </Container>
    );
  }
}
