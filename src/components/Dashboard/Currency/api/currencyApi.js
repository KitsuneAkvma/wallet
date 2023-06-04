// async function fetchCurrency() {
//   const response = await fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11');
//   const data = await response.json();

//   return data;
// }


const fetchCurrency = async () => {
  const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/c/?format=json');
  // const responseEUR = await fetch('http://api.nbp.pl/api/exchangerates/rates/c/eur/?format=json');
  const data = await response.json();
  // const dataEUR = await responseEUR.json();
  console.log(data);
  return data;
};

export default { fetchCurrency };
