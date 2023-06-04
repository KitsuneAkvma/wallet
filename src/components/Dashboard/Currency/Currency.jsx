import React, { useEffect, useState } from "react";
import currencyApi from "./api/currencyApi";
import LoaderSpinner from "../../_General/Loader";
import styles from "./Currency.module.css";

export default function CurrencyTable() {
  const [currency, setCurrency] = useState([]);

  useEffect(() => {
    const fetchCurrency = async () => {
      const data = await currencyApi.fetchCurrency();
        const currencies = data[0].rates.filter(rate => rate.code === 'EUR' || rate.code === 'USD');
  const filteredCurrencies = currencies.map(rate => ({
    currency: rate.code,
    bid: rate.bid.toFixed(2),
    ask: rate.ask.toFixed(2)
  }));
console.log(filteredCurrencies);
      setCurrency(filteredCurrencies);
      localStorage.setItem("currency", JSON.stringify(filteredCurrencies));
      localStorage.setItem("currencyTime", Date.now());
    };
    let currencyLS = JSON.parse(localStorage.getItem("currency"));
    let currencyTime = JSON.parse(localStorage.getItem("currencyTime"));
    if (!currencyLS) {
      fetchCurrency();
    }
    if (Date.now() - currencyTime > 3600000) {
      fetchCurrency();
    } else {
      setCurrency(currencyLS);
    }
  },
   [])
   ;

  return (
    <div className={styles.currency}>
      {currency.length === 0 ? (
        <div className={styles.loader}>
          <LoaderSpinner />
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <td>Currency</td>
              <td>Purchase</td>
              <td>Sell</td>
            </tr>
          </thead>
          <tbody>
            {currency.map((item) => {
              return (
                <tr key={item.currency}>
                  <td>{item.currency}</td>
                  <td>{item.bid}</td>
                  <td>{item.ask}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}