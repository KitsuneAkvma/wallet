const fetchCurrency = async () => {
  const response = await fetch('http://api.nbp.pl/api/exchangerates/tables/c/?format=json');
  const data = await response.json();
  console.log(data);
  return data;
};

export default { fetchCurrency };
