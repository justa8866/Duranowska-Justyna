import React, { Component } from "react";
import { gql } from "@apollo/client";

import {
  Dollar,
  Arrow,
  ActiveArrow,
  DropdownMenu,
  DropdownItem,
} from "./CurrenciesSelector.style";

import arrow from "./arrow.png";

const GET_CURRENCIES = gql`
  query GetCurrencies {
    currencies {
      label
      symbol
    }
  }
`;

class CurrenciesSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false,
      currencies: [],
      ActiveCurrency: {},
    };
  }

  onChangeActiveCurrency = (currency) => {
    this.setState({ ActiveCurrency: currency, isToggleOn: false });
    localStorage.setItem("currency", JSON.stringify(currency));
    this.props.onChangeActiveCurrency(currency);
  };

  componentDidMount() {
    this.getCurrencies();
  }

  getActiveCurrency() {
    const currency = localStorage.getItem("currency");

    if (!currency) {
      return null;
    }

    return JSON.parse(currency);
  }

  async getCurrencies() {
    const result = await this.props.client.query({
      query: GET_CURRENCIES,
    });
    const currencies = [...this.state.currencies];

    if (result.data) {
      if (result.data.currencies) {
        result.data.currencies.map((currency, index) => {
          currencies.push({ label: currency.label, symbol: currency.symbol });
          return null;
        });
      }
    }

    const storageCurrency = this.getActiveCurrency();

    this.onChangeActiveCurrency(storageCurrency || currencies[0]);

    this.setState({
      currencies,
      ActiveCurrency: {
        symbol: storageCurrency ? storageCurrency.symbol : currencies[0].symbol,
        label: storageCurrency ? storageCurrency.label : currencies[0].label,
      },
    });
  }

  handleClick = () => {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  };

  render() {
    return (
      <>
        <Dollar>{this.state.ActiveCurrency.symbol}</Dollar>
        {this.state.isToggleOn === false ? 
        <Arrow src={arrow} onClick={this.handleClick}></Arrow>
        : <ActiveArrow src={arrow} onClick={this.handleClick}></ActiveArrow>
        }
        <DropdownMenu toggleOn={this.state.isToggleOn}>
          {this.state.currencies.map((currency, index) => (
            <DropdownItem
              key={index}
              ActiveCurrency={this.state.ActiveCurrency}
              onClick={() => this.onChangeActiveCurrency(currency)}
            >
              {currency.symbol} {currency.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </>
    );
  }
}

export default CurrenciesSelector;
