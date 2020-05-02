const formatValue = (value: number): string => {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
};
// return Intl.NumberFormat().format(value); // TODO

export default formatValue;
