const formatValue = (value: number): string => {
  const formatter = new Intl.NumberFormat([], {
    style: 'currency',
    currency: 'BRL',
  });

  return formatter.format(value);
};

export default formatValue;
