import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setInlineRedux } from "../../redux/promodex/actions";
import { Card, Row, Col, Input, Select, Button } from "antd"
import moment from 'moment';
import { AiOutlineSwap } from "react-icons/ai";

const currencyTypes = [
  { value: "USD", name: "DOLAR (USD)" },
  { value: "ARS", name: "Argentine Peso (ARS)" },
  { value: "AUD", name: "Australian Dollar (AUD)" },
  { value: "BCH", name: "Bitcoin Cash (BCH)" },
  { value: "BGN", name: "Bulgarian Lev (BGN)" },
  { value: "BNB", name: "Binance Coin (BNB)" },
  { value: "BRL", name: "Brazilian Real (BRL)" },
  { value: "BTC", name: "Bitcoin (BTC)" },
  { value: "CAD", name: "Canadian Dollar (CAD)" },
  { value: "CHF", name: "Swiss Franc (CHF)" },
  { value: "CNY", name: "Chinese Yuan (CNY)" },
  { value: "CZK", name: "Czech Republic Koruna (CZK)" },
  { value: "DKK", name: "Danish Krone (DKK)" },
  { value: "DOGE", name: "Dogecoin (DOGE)" },
  { value: "DZD", name: "Algerian Dinar (DZD)" },
  { value: "ETH", name: "Ethereum (ETH)" },
  { value: "EUR", name: "Euro (EUR)" },
  { value: "GBP", name: "British Pound Sterling (GBP)" },
  { value: "HKD", name: "Hong Kong Dollar (HKD)" },
  { value: "HRK", name: "Croatian Kuna (HRK)" },
  { value: "HUF", name: "Hungarian Forint (HUF)" },
  { value: "IDR", name: "Indonesian Rupiah (IDR)" },
  { value: "ILS", name: "Israeli New Sheqel (ILS)" },
  { value: "INR", name: "Indian Rupee (INR)" },
  { value: "ISK", name: "Icelandic Króna (ISK)" },
  { value: "JPY", name: "Japanese Yen (JPY)" },
  { value: "KRW", name: "South Korean Won (KRW)" },
  { value: "LTC", name: "Litecoin (LTC)" },
  { value: "MAD", name: "Moroccan Dirham (MAD)" },
  { value: "MXN", name: "Mexican Peso (MXN)" },
  { value: "MYR", name: "Malaysian Ringgit (MYR)" },
  { value: "NOK", name: "Norwegian Krone (NOK)" },
  { value: "NZD", name: "New Zealand Dollar (NZD)" },
  { value: "PHP", name: "Philippine Peso (PHP)" },
  { value: "PLN", name: "Polish Zloty (PLN)" },
  { value: "RON", name: "Romanian Leu (RON)" },
  { value: "RUB", name: "Russian Ruble (RUB)" },
  { value: "SEK", name: "Swedish Krona (SEK)" },
  { value: "SGD", name: "Singapore Dollar (SGD)" },
  { value: "THB", name: "Thai Baht (THB)" },
  { value: "TRY", name: "Turkish Lira (TRY)" },
  { value: "TWD", name: "New Taiwan Dollar (TWD)" },
  { value: "XRP", name: "Ripple (XRP)" },
  { value: "ZAR", name: "South African Rand (ZAR)" },
]

const LandingPageContent = (props) => {
  const [loading, setLoading] = useState(true)
  const [rightValue, setRightValue] = useState("TRY")
  const [leftValue, setLeftValue] = useState("USD")
  const [result, setResult] = useState(0)
  const [multipleValue, setMultipleValue] = useState(1)
  const [date, setDate] = useState(0)



  const apikey = "160437755a1a428c932515e0fef1c0b5"

  const { Option } = Select;

  const handleChange = async (value, type) => {

    switch (type) {
      case "right":
        setRightValue(value);
        handleSearch(leftValue, value)
        break;
      case "left":
        setLeftValue(value);
        handleSearch(rightValue, value)

        break;
      default: console.log("112358"); break;
    }



  };


  const handleSearch = (right, left) => {


    const searchQuery = "https://exchange-rates.abstractapi.com/v1/live/?api_key=" + apikey + "&base=" + left + "&target=" + right;

    fetch(searchQuery)
      .then(response => response.json())
      .then(data => {
        setDate(moment.unix(data.last_updated).format("YYYY-MM-DD HH:mm"))
        setResult(data.exchange_rates)
        setLoading(false)
      });
  }


  const handleSwap = () => {
    handleSearch(leftValue, rightValue)

    setLeftValue(rightValue);
    setRightValue(leftValue)
  }

  useEffect(() => {

    handleSearch(rightValue, leftValue)
  }, [])





  const currenctSelectInput = currencyTypes.map((currency, index) => {
    return (
      <Option key={index} value={currency.value}>{currency.name}</Option>
    )
  })


  return (
    <Card loading={loading}>
      <Row style={{ marginTop: window.innerHeight / 3.5, marginLeft: 100, marginRight: 100 }}>
        <Col style={{ marginBottom: 25 }} sm={{ span: 8, offset: 8 }}>
          <Input
            style={{ textAlign: "center" }}
            disabled
            size='large'
            value={date}
          />
        </Col>
        <Col sm={{ span: 8, offset: 2 }}>
          <Select
            size='large'
            value={leftValue}
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

            }
            style={{ width: "100%" }}
            onChange={(event) => handleChange(event, "left")}>
            {currenctSelectInput}
          </Select>
        </Col>

        <Col sm={{ span: 1, offset: 1 }}>
          <AiOutlineSwap style={{ cursor: "pointer" }} onClick={() => handleSwap()} size={40} />
        </Col>
        <Col sm={{ span: 8, offset: 1 }}>
          <Select
            size='large'
            value={rightValue}
            showSearch
            filterOption={(input, option) =>
              option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0

            }
            style={{ width: "100%" }}
            onChange={(event) => handleChange(event, "right")}>
            {currenctSelectInput}
          </Select>
        </Col>
        <Col style={{ marginTop: 25 }} sm={{ span: 8, offset: 2 }}>
          <Input
            size='large'
            onChange={(event) => setMultipleValue(event.target.value)}
            type="number"
            value={multipleValue}
          />
        </Col>

        <Col style={{ marginTop: 25 }} sm={{ span: 8, offset: 3 }}>
          <Input
            size='large'
            disabled
            value={result[leftValue] * multipleValue || result[rightValue] * multipleValue}
          />

        </Col>

      </Row>

    </Card>
  );
}

const mapState = (globalState) => {
  return { inlineInformation: globalState.inlineInformation };
};
export default connect(mapState, { setInlineRedux })(withRouter(LandingPageContent));
