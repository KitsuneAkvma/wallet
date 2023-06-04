const fetchNBP = async () => {
  const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/c/?format=json');
  const data = await response.json();
  return data;
};

export default { fetchNBP };
